import os
import spacy

# Load spaCy's language model
nlp = spacy.load("en_core_web_sm")

# Ensure output directories exist
def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# Function to extract keywords from the extracted keywords file
def load_keywords(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            keywords = file.read().splitlines()
        return keywords
    else:
        print(f"Keyword file '{file_path}' not found.")
        return []

# Function to calculate score based on keyword matching
def calculate_score(content, keywords):
    doc = nlp(content)
    tokens = set(token.text.lower() for token in doc if not token.is_stop and not token.is_punct)
    matched_keywords = tokens.intersection(set(keywords))
    score = (len(matched_keywords) / len(keywords)) * 100 if keywords else 0
    return round(score, 2), matched_keywords

# Function to process the skills and calculate score
def process_skills(input_file, keywords_file, output_file):
    ensure_directory_exists(os.path.dirname(output_file))

    if not os.path.exists(input_file):
        print(f"Input file '{input_file}' not found. Creating a null file.")
        with open(output_file, "w") as file:
            file.write("Score: 0\nMatched Keywords: None\n")
        return

    # Load content and keywords
    with open(input_file, "r") as file:
        content = file.read()
    
    keywords = load_keywords(keywords_file)

    # Calculate score
    score, matched_keywords = calculate_score(content, keywords)

    # Write the result to the output file
    with open(output_file, "w") as file:
        file.write(f"Score: {score}\n")
    
    print(f"Score and matched keywords saved to '{output_file}'.")

# File paths
input_file = "D:/Certificates/Hackathon/Extracted File 2/Skills"
keywords_file = "D:/Certificates/Hackathon/Keyword Extraction/Skills keyword.txt"
output_file = "D:/Certificates/Hackathon/Score Output/Skills Score.txt"

# Process skills scoring
process_skills(input_file, keywords_file, output_file)
