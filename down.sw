#!/bin/bash

# Base URL where your files are located (replace with the actual URL)
base_url="https://download.tvquran.com/download/TvQuran.com__Al-Ghamdi/"

# Start of the file numbering
start=1

# End of the file numbering
end=114

# Loop to download the files
for i in $(seq -f "%03g" $start $end); do
  filename="${i}.mp3"
  url="${base_url}${filename}"
  wget $url
done
