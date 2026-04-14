# -*- coding: utf-8 -*-
"""
Escuela de Verano IA
Ejemplo: Análisis de reclamos de restaurantes CON taxonomía.

Demuestra 3 estrategias independientes:
1) Zero-shot classification
2) Few-shot classification
3) Chain-of-Thought (thinking mode, pero output final en pipes)
"""

import pandas as pd
from openai import OpenAI

# =========================================================
# 1) Leer reclamos desde un DataFrame
# =========================================================
df = pd.read_excel("reviews_sample.xlsx")
TEXT_COL = "comments"
df_sample = df.head(10).copy()

# =========================================================
# 2) Cliente LLM local
# =========================================================
client = OpenAI(
    base_url="http://localhost:1234/v1",
    api_key="lm-studio"
)

# =========================================================
# 3) TAXONOMÍA
# =========================================================
TAXONOMIA = [
    "Calidad de la comida",
    "Temperatura de la comida",
    "Tamaño de las porciones",
    "Calidad de las bebidas",
    "Tiempo de espera",
    "Actitud del personal",
    "Errores en la orden",
    "Higiene y limpieza",
    "Ambiente / ruido",
    "Precio / valor percibido",
    "Problemas con el pago o boleta",
    "Problemas con delivery",
    "Reservas / asignación de mesa"
]

TAXONOMIA_STR = "\n".join(f"- {t}" for t in TAXONOMIA)

# =========================================================
# 4) Función COMÚN de parseo de output en pipes
# =========================================================
def parse_pipe_output_tax(pipe_output: str):
    """
    Formato esperado:
    Sentimiento:...|Score:...|
    Tipo1:...|Score Tipo1:...|Tipo2:...|Score Tipo2:...|...
    """
    out = {
        "sentimiento": None,
        "score_global": None,
        "tipos": [],
        "scores_tipos": []
    }

    if not isinstance(pipe_output, str):
        return out

    parts = [p.strip() for p in pipe_output.split("|") if p.strip()]

    if len(parts) < 2:
        return out

    # Sentimiento
    if ":" in parts[0]:
        out["sentimiento"] = parts[0].split(":", 1)[1].strip()

    # Score global
    if ":" in parts[1]:
        try:
            out["score_global"] = int(parts[1].split(":", 1)[1].strip())
        except:
            out["score_global"] = None

    # Tipos y puntuaciones
    i = 2
    while i < len(parts):
        tipo_val = None
        score_val = None

        if ":" in parts[i]:
            tipo_val = parts[i].split(":", 1)[1].strip()

        if i + 1 < len(parts) and ":" in parts[i+1]:
            try:
                score_val = int(parts[i+1].split(":", 1)[1].strip())
            except:
                score_val = None

        if tipo_val is not None:
            out["tipos"].append(tipo_val)
            out["scores_tipos"].append(score_val)

        i += 2

    return out


# =========================================================
# 5) Separador <think>
# =========================================================
def separa_think(pipe_output: str):
    if not isinstance(pipe_output, str):
        return "", ""

    start_tag = "<think>"
    end_tag = "</think>"

    start_idx = pipe_output.find(start_tag)
    end_idx = pipe_output.find(end_tag)

    if start_idx == -1 or end_idx == -1:
        return "", pipe_output.strip()

    start_idx += len(start_tag)
    razonamiento = pipe_output[start_idx:end_idx].strip()
    respuesta_final = pipe_output[end_idx + len(end_tag):].strip()

    return razonamiento, respuesta_final

#%%
# =========================================================
# 6) Zero-shot CON TAXONOMÍA
# =========================================================
def analiza_zero_shot_tax(reclamo: str) -> str:
    system_msg = f"""
Eres un asistente experto en análisis de reclamos de restaurantes.

Solo puedes elegir tópicos de la siguiente taxonomía:

{TAXONOMIA_STR}

Formato EXACTO:
Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|
Tipo1:<uno de la taxonomía>|Score Tipo1:<0..100>|
Tipo2:<opcional>|Score Tipo2:<0..100>|
Tipo3:<opcional>|Score Tipo3:<0..100>
"""

    user_msg = f"""
Analiza el siguiente reclamo usando EXCLUSIVAMENTE la taxonomía entregada:

\"\"\"{reclamo}\"\"\""""

    completion = client.chat.completions.create(
        model="my-local-model",
        messages=[{"role": "system", "content": system_msg},
                  {"role": "user", "content": user_msg}],
        temperature=0.01,
        max_tokens=2500
    )

    print(completion.choices[0].message.content[:250])
    return completion.choices[0].message.content.strip()


# Ejecutar ZERO-SHOT
df_zero = df_sample.copy()
df_zero["llm_zero_raw"] = df_zero[TEXT_COL].apply(analiza_zero_shot_tax)
df_zero[["zero_think", "zero_answer"]] = df_zero["llm_zero_raw"].apply(lambda s: pd.Series(separa_think(s)))
df_zero_parsed = df_zero["zero_answer"].apply(parse_pipe_output_tax)
df_zero_parsed = pd.DataFrame(df_zero_parsed.tolist()).add_prefix("zero_")

df_zero_out = pd.concat([df_zero, df_zero_parsed], axis=1)
df_zero_out.to_excel("reclamos_con_taxonomia_zero_shot.xlsx", index=False)
print("Ejemplo 1 (zero-shot + taxonomía) listo.")

#%%
# =========================================================
# 7) FEW-SHOT CON TAXONOMÍA
# =========================================================
def analiza_few_shot_tax(reclamo: str) -> str:

    system_msg = f"""
Eres un asistente experto en análisis de reclamos de restaurantes.

Solo puedes usar los TIPOS de la taxonomía:

{TAXONOMIA_STR}

Formato EXACTO:
Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|
Tipo1:<uno de la taxonomía>|Score Tipo1:<0..100>|
Tipo2:<opcional>|Score Tipo2:<0..100>|
Tipo3:<opcional>|Score Tipo3:<0..100>
"""

    # Ejemplo 1
    user_ej1 = """
RECLAMO:
"Esperamos 45 minutos y la comida llegó fría."
Devuelve solo la línea con pipes.
"""
    assistant_ej1 = (
        "Sentimiento:negativo|Score:-90|"
        "Tipo1:Tiempo de espera|Score Tipo1:95|"
        "Tipo2:Temperatura de la comida|Score Tipo2:90"
    )

    # Ejemplo 2
    user_ej2 = """
RECLAMO:
"El local estaba sucio y el precio muy alto."
Devuelve solo la línea con pipes.
"""
    assistant_ej2 = (
        "Sentimiento:negativo|Score:-70|"
        "Tipo1:Higiene y limpieza|Score Tipo1:95|"
        "Tipo2:Precio / valor percibido|Score Tipo2:85"
    )

    user_target = f"""
Ahora analiza este reclamo y devuelve solo la línea con pipes:

\"\"\"{reclamo}\"\"\""""

    completion = client.chat.completions.create(
        model="my-local-model",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_ej1},
            {"role": "assistant", "content": assistant_ej1},
            {"role": "user", "content": user_ej2},
            {"role": "assistant", "content": assistant_ej2},
            {"role": "user", "content": user_target},
        ],
        temperature=0.01,
        max_tokens=2500
    )

    print(completion.choices[0].message.content[:250])
    return completion.choices[0].message.content.strip()


# Ejecutar FEW-SHOT
df_few = df_sample.copy()
df_few["llm_few_raw"] = df_few[TEXT_COL].apply(analiza_few_shot_tax)
df_few[["few_think", "few_answer"]] = df_few["llm_few_raw"].apply(lambda s: pd.Series(separa_think(s)))
df_few_parsed = df_few["few_answer"].apply(parse_pipe_output_tax)
df_few_parsed = pd.DataFrame(df_few_parsed.tolist()).add_prefix("few_")

df_few_out = pd.concat([df_few, df_few_parsed], axis=1)
df_few_out.to_excel("reclamos_con_taxonomia_few_shot.xlsx", index=False)
print("Ejemplo 2 (few-shot + taxonomía) listo.")

#%%
# =========================================================
# 8) CoT CON TAXONOMÍA
# =========================================================
def analiza_cot_tax(reclamo: str) -> str:

    system_msg = f"""
Eres un asistente experto en análisis de reclamos de restaurantes.
Solo puedes usar los TIPOS de la taxonomía:

{TAXONOMIA_STR}

Primero, piensa ENTRE <think> y </think>, pero máximo 10 frases O 500 palabras.
Luego SIEMPRE entrega la línea final con este formato exacto:

Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|
Tipo1:<uno de la taxonomía>|Score Tipo1:<0..100>|
Tipo2:<opcional>|Score Tipo2:<0..100>|
Tipo3:<opcional>|Score Tipo3:<0..100>
"""
    user_msg = f"""
Analiza el reclamo y sigue exactamente las instrucciones:

\"\"\"{reclamo}\"\"\""""

    completion = client.chat.completions.create(
        model="my-local-model",
        messages=[{"role": "system", "content": system_msg},
                  {"role": "user", "content": user_msg}],
        temperature=0.01,
        max_tokens=2500
    )

    print(completion.choices[0].message.content[:250])
    return completion.choices[0].message.content.strip()


# Ejecutar CoT
df_cot = df_sample.copy()
df_cot["llm_cot_raw"] = df_cot[TEXT_COL].apply(analiza_cot_tax)
df_cot[["cot_think", "cot_answer"]] = df_cot["llm_cot_raw"].apply(lambda s: pd.Series(separa_think(s)))
df_cot_parsed = df_cot["cot_answer"].apply(parse_pipe_output_tax)
df_cot_parsed = pd.DataFrame(df_cot_parsed.tolist()).add_prefix("cot_")

df_cot_out = pd.concat([df_cot, df_cot_parsed], axis=1)
df_cot_out.to_excel("reclamos_con_taxonomia_cot.xlsx", index=False)
print("Ejemplo 3 (CoT + taxonomía) listo.")
