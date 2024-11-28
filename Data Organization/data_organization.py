import os
import spacy
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# Load spaCy model
nlp = spacy.load("en_core_web_sm")


# Define the section keywords for CV categorization
section_keywords = {
    "Profile": ["about me", "profile", "summary", "biography"],
    "Projects": ["projects", "portfolio", "work", "project"],
    "Work Experience": ["experience", "work", "employment", "career"],
    "Education": ["education", "degree", "university", "school", "college"],
    "Certification": ["certification", "certificates", "training", "courses"],
    "Skills": ["skills", "technical skills", "competencies", "abilities"]
}

# Function to preprocess the text using spaCy and NLTK
def preprocess_text(text):
    # Step 1: Clean up and standardize the text
    text = text.strip().lower()
    
    # Step 2: Tokenize text into sentences using NLTK
    sentences = sent_tokenize(text)
    
    # Step 3: Remove stop words using NLTK
    stop_words = set(stopwords.words('english'))
    cleaned_sentences = []
    for sentence in sentences:
        words = word_tokenize(sentence)
        cleaned_sentence = [word for word in words if word not in stop_words]
        cleaned_sentences.append(" ".join(cleaned_sentence))
    
    return cleaned_sentences

# Function to extract sections based on keywords
def extract_sections(text):
    # Process the text using spaCy
    doc = nlp(text)
    
    # Store extracted sections
    sections = {
        "Profile": [],
        "Projects": [],
        "Work Experience": [],
        "Education": [],
        "Certification": [],
        "Skills": []
    }
    
    # Loop through sentences and try to classify them into sections
    for sent in doc.sents:
        sentence_text = sent.text.lower()

        # Check for section keywords
        for section, keywords in section_keywords.items():
            if any(keyword in sentence_text for keyword in keywords):
                sections[section].append(sent.text.strip())

    # Remove duplicate entries
    for section in sections:
        sections[section] = list(set(sections[section]))

    return sections

# Function to format the extracted sections into a single file content
def format_sections_for_output(sections):
    formatted_text = ""
    for section, content in sections.items():
        if content:
            formatted_text += f"\n--- {section} ---\n"
            for item in content:
                formatted_text += f"  - {item}\n"  # No truncation, print full sentence
    return formatted_text

# Function to save the extracted sections into a single output file
def save_sections_to_single_file(sections, output_file):
    formatted_text = format_sections_for_output(sections)
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(formatted_text)
    print(f"Saved all sections to {output_file}")

# Function to read the text from a file
def read_text_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Main function to process the file and extract sections
def process_extracted_data_from_file(input_file, output_file):
    # Step 1: Read the extracted text from the input file
    extracted_text = read_text_from_file(input_file)
    
    # Step 2: Preprocess the extracted text
    cleaned_text = preprocess_text(extracted_text)
    
    # Step 3: Extract sections from the cleaned text
    sections = extract_sections(" ".join(cleaned_text))
    
    # Step 4: Save the extracted sections into a single output file
    save_sections_to_single_file(sections, output_file)

# Define the path to the input file (combined_output.txt) and output file
base_dir = os.path.dirname(os.path.abspath(__file__))  # Directory of the script
hackathon_dir = os.path.dirname(base_dir)  # Navigate up to Hackathon folder

input_file = os.path.join(hackathon_dir, "combined_output.txt")  # Input file in Hackathon folder
output_file = os.path.join(hackathon_dir, "combined_output_final.txt")  # Output file in Hackathon folder

# Process the data and save the result
process_extracted_data_from_file(input_file, output_file)
