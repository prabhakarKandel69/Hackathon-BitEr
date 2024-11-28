import fitz  # PyMuPDF
import os

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
        return None

def process_pdf_bulk(input_dir, output_dir="Processed_PDFs"):
    """
    Process multiple PDF files from a directory.
    :param input_dir: Directory containing PDF files.
    :param output_dir: Directory to save processed text files.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.endswith(".pdf"):
            file_path = os.path.join(input_dir, filename)
            text = extract_text_from_pdf(file_path)
            if text:
                output_file = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}.txt")
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(text)
                print(f"Processed and saved: {output_file}")

if _name_ == "_main_":
    # Set the input directory relative to the script's location
    base_dir = os.path.dirname(os.path.abspath(_file_))  # Get the script's directory
    input_directory = os.path.join(base_dir, "..", "PDF")  # Navigate to Hackathon/PDF
    output_directory = os.path.join(base_dir, "..", "Processed_PDFs")

    
    process_pdf_bulk(input_directory, output_directory)