# -*- coding: utf-8 -*-
"""
Escuela de Verano IA
Ejemplo: Análisis de reclamos de restaurantes SIN taxonomía.

Demuestra 3 estrategias independientes:
1) Zero-shot classification
2) Few-shot classification
3) Chain-of-Thought (thinking mode, pero output final en pipes)

Requisitos:
- Archivo 'restaurant_complaints_sample.xlsx' con una columna de texto (reclamos).
- Servidor LLM local tipo LM Studio / OpenAI-compatible.
"""

import pandas as pd
from openai import OpenAI

# =========================================================
# 1) Leer reclamos desde un DataFrame
# =========================================================
df = pd.read_excel("reviews_sample.xlsx")

# Cambia aquí el nombre de la columna que contiene el texto del reclamo
TEXT_COL = "comments"   # ej: "comments", "texto_reclamo", etc.

# Para la demo, usamos solo algunos reclamos
df_sample = df.head(10).copy()

#%%
# =========================================================
# 2) Cliente LLM local (LM Studio / servidor OpenAI-compatible)
# =========================================================
client = OpenAI(
    base_url="http://localhost:1234/v1",   # ajusta puerto si es distinto
    api_key="lm-studio"                    # valor dummy, LM Studio no lo valida
)

# =========================================================
# 3) Función COMÚN de parseo de output en pipes
#    Formato esperado:
#    Sentimiento:<...>|Score:<...>|
#    Tópico1:<...>|Score Tópico1:<...>|
#    Tópico2:<...>|Score Tópico2:<...>|...
# =========================================================
def parse_pipe_output(pipe_output: str):
    """
    Recibe una línea tipo:
    Sentimiento:negativo|Score:-80|Tópico1:Tiempo de espera|Score Tópico1:95|...
    y devuelve un dict con sentimiento, score y listas de tópicos/scores.
    """
    out = {
        "sentimiento": None,
        "score_global": None,
        "topicos": [],
        "scores_topicos": []
    }

    if not isinstance(pipe_output, str):
        return out
    
       
    parts = [p.strip() for p in pipe_output.split("|") if p.strip()]

    if len(parts) < 2:
        return out

    # Asumimos formato estricto en las dos primeras partes
    # Sentimiento:...
    if ":" in parts[0]:
        out["sentimiento"] = parts[0].split(":", 1)[1].strip()

    # Score:...
    if ":" in parts[1]:
        try:
            out["score_global"] = int(parts[1].split(":", 1)[1].strip())
        except ValueError:
            out["score_global"] = None

    # A partir de la posición 2, vamos en pares (tópico, score)
    i = 2
    while i < len(parts):
        # TópicoX:...
        if ":" in parts[i]:
            topico = parts[i].split(":", 1)[1].strip()
        else:
            topico = None

        score_topico = None
        if i + 1 < len(parts) and ":" in parts[i + 1]:
            try:
                score_topico = int(parts[i + 1].split(":", 1)[1].strip())
            except ValueError:
                score_topico = None

        if topico is not None:
            out["topicos"].append(topico)
            out["scores_topicos"].append(score_topico)

        i += 2

    return out

def separa_think(pipe_output: str):
    """
    Recibe el output raw del modelo que puede incluir:
    <think> ... </think>

    Devuelve:
        razonamiento (str)
        respuesta_final (str)
    """
    if not isinstance(pipe_output, str):
        return "", ""

    start_tag = "<think>"
    end_tag = "</think>"

    start_idx = pipe_output.find(start_tag)
    end_idx = pipe_output.find(end_tag)

    # Caso sin tags
    if start_idx == -1 or end_idx == -1:
        return "", pipe_output.strip()

    # Extraer razonamiento
    start_idx += len(start_tag)
    razonamiento = pipe_output[start_idx:end_idx].strip()

    # Respuesta final = lo que viene después de </think>
    respuesta_final = pipe_output[end_idx + len(end_tag):].strip()

    return razonamiento, respuesta_final


    
#%%
# =========================================================
# 4) EJEMPLO 1 – ZERO-SHOT (sin ejemplos, sin taxonomía)
# =========================================================
def analiza_zero_shot(reclamo: str) -> str:
    """
    Zero-shot: solo instrucciones. El modelo inventa sus propios tópicos.
    Output SIEMPRE en una sola línea separada por pipes.
    """
    system_msg = """
Eres un asistente experto en análisis de reclamos de clientes en restaurantes.
Tu tarea es:
1) Identificar de 1 a 3 TÓPICOS principales del reclamo (tú asignas los nombres).
2) Clasificar el SENTIMIENTO global: positivo, neutral o negativo.
3) Asignar un SCORE global entero entre -100 y 100 (-100 muy negativo, 0 neutro, 100 muy positivo).
4) Asignar un SCORE de relevancia (0 a 100) a cada tópico.

Formato EXACTO de salida (una sola línea):
Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|Tópico1:<texto>|Score Tópico1:<0..100>|Tópico2:<opcional>|Score Tópico2:<0..100>|Tópico3:<opcional>|Score Tópico3:<0..100>

No agregues comentarios ni texto extra, SOLO esa línea.
"""
    user_msg = f"""
Analiza el siguiente reclamo de restaurante:

\"\"\"{reclamo}\"\"\""""

    completion = client.chat.completions.create(
        model="my-local-model",       # cambia por el nombre de tu modelo en LM Studio
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ],
        temperature=0.01,
        max_tokens=2500
    )
    
    print(completion.choices[0].message.content.strip()[0:250])

    return completion.choices[0].message.content.strip()


# Ejecutar ejemplo 1
df_zero = df_sample.copy()
# Llamada al modelo
df_zero["llm_zero_shot_raw"] = df_zero[TEXT_COL].apply(analiza_zero_shot)

# Separar razonamiento y respuesta final
# separa_think -> (razonamiento, respuesta_final)
df_zero[["zero_think", "zero_answer"]] = df_zero["llm_zero_shot_raw"].apply(lambda s: pd.Series(separa_think(s)))

# Parsear SOLO la respuesta final (en formato pipes)
df_zero_parsed = df_zero["zero_answer"].apply(parse_pipe_output)
df_zero_parsed = pd.DataFrame(df_zero_parsed.tolist()).add_prefix("zero_")

# Unir todo y exportar
df_zero_out = pd.concat([df_zero, df_zero_parsed], axis=1)
df_zero_out.to_excel("reclamos_sin_taxonomia_zero_shot.xlsx", index=False)
print("Ejemplo 1 (zero-shot) listo -> reclamos_sin_taxonomia_zero_shot.xlsx")
#%%
# =========================================================
# 5) EJEMPLO 2 – FEW-SHOT (con 2 ejemplos de contexto)
# =========================================================
def analiza_few_shot(reclamo: str) -> str:
    """
    Few-shot: se dan un par de ejemplos de input-output en el mismo formato.
    """
    system_msg = """
Eres un asistente experto en análisis de reclamos de clientes en restaurantes.
Usa el mismo formato de salida que en los ejemplos (una sola línea con pipes).
Formato EXACTO:
Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|Tópico1:<texto>|Score Tópico1:<0..100>|Tópico2:<opcional>|Score Tópico2:<0..100>|Tópico3:<opcional>|Score Tópico3:<0..100>
"""

    # Ejemplo 1
    user_ej1 = """
RECLAMO:
"Esperamos casi una hora y la comida llegó fría. Nadie se disculpó."
Devuelve el análisis en la línea con pipes.
"""
    assistant_ej1 = (
        "Sentimiento:negativo|Score:-85|"
        "Tópico1:Tiempo de espera|Score Tópico1:95|"
        "Tópico2:Temperatura de la comida|Score Tópico2:90|"
        "Tópico3:Actitud del personal|Score Tópico3:80"
    )

    # Ejemplo 2
    user_ej2 = """
RECLAMO:
"La comida estaba rica, pero el local estaba muy sucio y ruidoso."
Devuelve el análisis en la línea con pipes.
"""
    assistant_ej2 = (
        "Sentimiento:negativo|Score:-50|"
        "Tópico1:Higiene|Score Tópico1:90|"
        "Tópico2:Ambiente ruidoso|Score Tópico2:80"
    )

    user_target = f"""
Ahora analiza ESTE reclamo y devuelve solo la línea con pipes:

RECLAMO:
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
    
    print(completion.choices[0].message.content.strip()[0:250])
    return completion.choices[0].message.content.strip()


# Ejecutar ejemplo 2
df_few = df_sample.copy()

# Llamada al modelo
df_few["llm_few_shot_raw"] = df_few[TEXT_COL].apply(analiza_few_shot)

# Separar razonamiento y respuesta final
df_few[["few_think", "few_answer"]] = df_few["llm_few_shot_raw"].apply(
    lambda s: pd.Series(separa_think(s))
)

# Parsear SOLO la respuesta final (línea con pipes)
df_few_parsed = df_few["few_answer"].apply(parse_pipe_output)
df_few_parsed = pd.DataFrame(df_few_parsed.tolist()).add_prefix("few_")

# Unir todo y exportar
df_few_out = pd.concat([df_few, df_few_parsed], axis=1)
df_few_out.to_excel("reclamos_sin_taxonomia_few_shot.xlsx", index=False)
print("Ejemplo 2 (few-shot) listo -> reclamos_sin_taxonomia_few_shot.xlsx")


#%%
# =========================================================
# 6) EJEMPLO 3 – THINKING MODE / CoT
# =========================================================
def analiza_cot(reclamo: str) -> str:
    """
    Chain-of-Thought (thinking mode) con límite de razonamiento.
    Le pedimos al modelo que piense, pero que el <think> sea CORTO.
    """
    system_msg = """
Eres un asistente experto en análisis de reclamos de restaurantes.

Primero, vas a escribir tu razonamiento ENTRE las etiquetas <think> y </think>,
pero ese razonamiento debe ser MUY BREVE:
- Máximo 10 frases O 500 palabras.
- Si te estás quedando sin espacio, omite detalles y ve directo a la conclusión.

Luego SIEMPRE debes escribir la respuesta final FUERA de <think></think>,
en UNA sola línea con el siguiente formato (sin texto adicional):

Sentimiento:<positivo/neutral/negativo>|Score:<-100..100>|Tópico1:<texto>|Score Tópico1:<0..100>|Tópico2:<opcional>|Score Tópico2:<0..100>|Tópico3:<opcional>|Score Tópico3:<0..100>

Bajo ninguna circunstancia omitas la respuesta final.
Si no tienes tokens suficientes para razonar, escribe un <think> muy corto
y prioriza SIEMPRE la respuesta final en el formato indicado.
"""
    user_msg = f"""
Analiza el siguiente reclamo y sigue exactamente las instrucciones:

\"\"\"{reclamo}\"\"\""""

    completion = client.chat.completions.create(
        model="my-local-model",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ],
        temperature=0.01,
        max_tokens=2500  
    )

    print(completion.choices[0].message.content.strip()[0:250])
    return completion.choices[0].message.content.strip()



# Ejecutar ejemplo 3
df_cot = df_sample.copy()

# Llamada al modelo
df_cot["llm_cot_raw"] = df_cot[TEXT_COL].apply(analiza_cot)

# Separar razonamiento y respuesta final
df_cot[["cot_think", "cot_answer"]] = df_cot["llm_cot_raw"].apply(
    lambda s: pd.Series(separa_think(s))
)

# Parsear SOLO la respuesta final (la línea con pipes)
df_cot_parsed = df_cot["cot_answer"].apply(parse_pipe_output)
df_cot_parsed = pd.DataFrame(df_cot_parsed.tolist()).add_prefix("cot_")

# Unir todo y exportar
df_cot_out = pd.concat([df_cot, df_cot_parsed], axis=1)
df_cot_out.to_excel("reclamos_sin_taxonomia_cot.xlsx", index=False)
print("Ejemplo 3 (CoT) listo -> reclamos_sin_taxonomia_cot.xlsx")

