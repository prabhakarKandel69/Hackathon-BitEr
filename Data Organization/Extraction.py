import os
import re
import fitz  # PyMuPDF
from PIL import Image
import pytesseract

# Set up Tesseract executable path if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Update if needed


def extract_sections(text):
    """
    Extract sections such as Work Experience, Projects, and Skills from a CV.
    :param text: Raw text of the CV.
    :return: Dictionary containing extracted sections.
    """
    text = text.lower()
    section_headers = {
        "work_experience": r"(work experience|employment history|professional experience)",
        "projects": r"(projects|portfolio|notable work)",
        "skills": r"(skills|technical skills|competencies)"
    }

    extracted_sections = {}
    for section, pattern in section_headers.items():
        match = re.search(pattern, text)
        if match:
            start = match.end()
            end = len(text)
            next_headers = [v for k, v in section_headers.items() if k != section]
            for header in next_headers:
                next_match = re.search(header, text[start:])
                if next_match:
                    end = start + next_match.start()
                    break
            extracted_sections[section] = text[start:end].strip()
    return extracted_sections


def clean_extracted_sections(sections):
    """
    Clean and format the extracted sections.
    :param sections: Raw extracted sections.
    :return: Cleaned sections.
    """
    for section in sections:
        if sections[section]:
            sections[section] = re.sub(r"[^a-zA-Z0-9\s\-\.,]", "", sections[section])
            sections[section] = re.sub(r"\s{2,}", " ", sections[section]).strip()
    return sections


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file.
    :param pdf_path: Path to the PDF file.
    :return: Extracted text as a string.
    """
    try:
        text = ""
        with fitz.open(pdf_path) as pdf:
            for page in pdf:
                text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""


def extract_text_from_image(image_path):
    """
    Extract text from an image using Tesseract OCR.
    :param image_path: Path to the image file.
    :return: Extracted text as a string.
    """
    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text
    except Exception as e:
        print(f"Error extracting text from {image_path}: {e}")
        return ""


if __name__ == "__main__":
    # Define the path to the "File" directory
    script_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
    file_directory = os.path.join(script_dir, "..", "File")  # Navigate to "File" directory

    if not os.path.exists(file_directory):
        print(f"Error: The directory {file_directory} does not exist.")
        exit()

    # Process each file in the "File" directory
    for filename in os.listdir(file_directory):
        file_path = os.path.join(file_directory, filename)
        text = ""

        # Handle PDFs
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        # Handle Images
        elif filename.lower().endswith((".png", ".jpg", ".jpeg")):
            text = extract_text_from_image(file_path)

        # If text was extracted, process and extract sections
        if text:
            sections = extract_sections(text)
            cleaned_sections = clean_extracted_sections(sections)

            print(f"\n--- Extracted Sections from {filename} ---")
            for section, content in cleaned_sections.items():
                print(f"\n{section.capitalize()}:")
                print(content)
