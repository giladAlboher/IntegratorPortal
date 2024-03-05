# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the main.py file into the container at /app
COPY main.py /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y git
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run main.py when the container launches
CMD ["python", "main.py"]