import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import os

# Set up Tesseract executable path if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Update if needed

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
        return None

def process_pdf_bulk(input_dir, output_file="combined_output.txt"):
    """
    Process multiple PDF files from a directory and append extracted text to a single output file.
    :param input_dir: Directory containing PDF files.
    :param output_file: Output file to save combined extracted text.
    """
    with open(output_file, "a", encoding="utf-8") as output:
        for filename in os.listdir(input_dir):
            if filename.endswith(".pdf"):
                file_path = os.path.join(input_dir, filename)
                text = extract_text_from_pdf(file_path)
                if text:
                    output.write(f"--- Start of {filename} ---\n")
                    output.write(text)
                    output.write(f"\n--- End of {filename} ---\n\n")
                    print(f"Processed and appended text from: {filename}")

def process_image_bulk(input_dir, output_file="combined_output.txt"):
    """
    Process multiple image files from a directory and append extracted text to a single output file.
    :param input_dir: Directory containing image files.
    :param output_file: Output file to save combined extracted text.
    """
    with open(output_file, "a", encoding="utf-8") as output:
        for filename in os.listdir(input_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(input_dir, filename)
                text = extract_text_from_image(file_path)
                if text:
                    output.write(f"--- Start of {filename} ---\n")
                    output.write(text)
                    output.write(f"\n--- End of {filename} ---\n\n")
                    print(f"Processed and appended text from: {filename}")

if __name__ == "__main__":
    # Set the input directory relative to the script's location
    base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the script's directory
    pdf_input_directory = os.path.join(base_dir, "..", "Files")  # Navigate to Hackathon/PDF
    image_input_directory = os.path.join(base_dir, "..", "Files")  # Navigate to Hackathon/Images
    combined_output_file = os.path.join(base_dir, "..", "combined_output.txt")  # Output file

    # Ensure the output file is empty before starting
    if os.path.exists(combined_output_file):
        os.remove(combined_output_file)

    # Process both PDFs and images and append to a single file
    process_pdf_bulk(pdf_input_directory, combined_output_file)
    process_image_bulk(image_input_directory, combined_output_file)

    print(f"Text from all PDFs and images has been saved to {combined_output_file}")
