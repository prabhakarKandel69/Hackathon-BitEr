import pytesseract
from PIL import Image
import os

# Set up Tesseract executable path if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Update this path if needed

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

def process_image_bulk(input_dir, output_dir="Processed_Images"):
    """
    Process multiple image files from a directory.
    :param input_dir: Directory containing image files.
    :param output_dir: Directory to save processed text files.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(input_dir, filename)
            text = extract_text_from_image(file_path)
            if text:
                output_file = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}.txt")
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(text)
                print(f"Processed and saved: {output_file}")

if _name_ == "_main_":
    # Set the input directory relative to the script's location
    base_dir = os.path.dirname(os.path.abspath(_file_))  # Get the script's directory
    input_directory = os.path.join(base_dir, "..", "Images")  # Navigate to Hackathon/Images
    output_directory = os.path.join(base_dir, "..", "Processed_Images")

    process_image_bulk(input_directory, output_directory)