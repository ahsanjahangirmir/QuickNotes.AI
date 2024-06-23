## QuickNotes.AI

# Project Description

A simple note-taking Chrome extension with an intuitive UI, integrated with the Gemini API for summarizing the current webpage at the click of a button and appending the summary to your notes, built with Vanilla JS. Since Google has tightened its content security policies with the Manifest V3, Gemini REST API has been used instead of the Module API. If you run into any unexpected behavior/issues, reload the webpage. 

# Preview

<img width="1710" alt="image" src="https://github.com/ahsanjahangirmir/QuickNotes.AI/assets/65661108/4a12ce86-0802-4e17-b04a-56359b6a376e">

<img width="1710" alt="image" src="https://github.com/ahsanjahangirmir/QuickNotes.AI/assets/65661108/9b9180b3-0279-45a8-b809-f9c244b4ba59">

# Instructions: 

- Browse to https://ai.google.dev/gemini-api/docs/api-key and generate an API key for Gemini.
- Download the QuickNotes.AI folder from this repo and unzip it. 
- Navigate to "sidebar.js" in the QuickNotes.AI folder. Go to line 7 (window.GEMINI_API_KEY = "your_api_key_goes_here";) and paste your API key in the placeholder. Save and close the file.
- Open Google Chrome on your PC and navigate to chrome://extensions/
- Look for the "Load Unpacked" button in the top left corner, select and browse to where the folder is located on your PC and open it. The extension will be loaded into your browser.

<img width="355" alt="image" src="https://github.com/ahsanjahangirmir/QuickNotes.AI/assets/65661108/4fbe1d51-aa87-4470-8877-af394f90e747">

Pin the extension once loaded and press to load the sidebar. 
