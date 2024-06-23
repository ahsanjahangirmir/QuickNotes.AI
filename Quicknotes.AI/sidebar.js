(() => {

  if (typeof window.GEMINI_API_KEY === 'undefined') 
  
  {
  
    window.GEMINI_API_KEY = "your_api_key_goes_here";
    window.GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${window.GEMINI_API_KEY}`;
    
    let shadow; 

    window.createSidebar = function() 
    
    {
      if (!document.getElementById('quicknotes-sidebar')) 
      
      {
        let sidebarContainer = document.createElement('div');

        sidebarContainer.id = 'quicknotes-sidebar';

        shadow = sidebarContainer.attachShadow({ mode: 'open' });

        let styleSheet = document.createElement('style');

        styleSheet.textContent = `
        
        #quicknotes-sidebar 
        {
          position: fixed;
          top: 5vh;
          right: 0;
          width: 25vw;
          height: 90vh;
          background: rgba(31, 31, 31, 0.75);
          backdrop-filter: blur(5px);
          color: rgb(253, 253, 253);
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-shadow: -2px 0 50px rgba(0, 0, 0, 0.5);
          z-index: 10000;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          border-top-left-radius: 15px; 
          border-bottom-left-radius: 15px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        #quicknotes-sidebar.show 
        {
          transform: translateX(0);
        }

        #quicknotes-content 
        {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        #input_text 
        {
          padding: 10px;
          font-size: 1em;
          border-radius: 5px;
        }

        #btn_gemini 
        {
          padding: 10px;
          font-size: 1em;
          background-color: #4caf4f7c;
          border-radius: 10px;
          color: white;
          border: none;
          cursor: pointer;
        }

        #result_text 
        {
          margin-top: 10px;
          white-space: pre-wrap;
        }

        #quicknotes-buttons 
        {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .circle-button 
        {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #707070;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          margin: 12px;
          transition: opacity 0.2s; 
        }

        .circle-button:active 
        {
          opacity: 0.6;
        }

        #close-button 
        {
          width: 15px;
          height: 15px;
          background-color: #EC6A5E;
        }

        .line 
        {
          position: absolute;
          width: 12px;
          height: 1px;
          background-color: white;
        }

        .line1 
        {
          transform: rotate(0deg);
        }

        .line2 
        {
          transform: rotate(90deg);
        }

        #close-button .line 
        {
          width: 8px !important;
        }

        #close-button .line1 
        {
          background-color: black !important;
          transition: opacity 0.6s;
          opacity: 0;
          transform: rotate(45deg);
        }

        #close-button .line2 
        {
          background-color: black !important;
          transition: opacity 0.6s;
          opacity: 0;
          transform: rotate(-45deg);
        }

        #close-button:hover .line1 
        {
          opacity: 1;
        }

        #close-button:hover .line2 
        {
          opacity: 1;
        }

        #plus-button .line1 
        {
          transform: rotate(0deg);
        }

        #plus-button .line2 
        {
          transform: rotate(90deg);
        }

        #minus-button .line1 
        {
          transform: rotate(0deg);
        }

        #minus-button .line2 
        {
          transform: rotate(0deg);
        }

        h2 
        {
          font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 1px;
          margin-top: 10px;
          margin-bottom: 10px;
          padding-left: 12px;
          color: white;
        }

        .notes-list 
        {
          flex-grow: 1;
          overflow-y: auto;
          max-height: 80vh;
        }

        .note 
        {
          padding: 8px;
          border-bottom: 1px solid grey;
          width: 96%;
          padding-top: 10px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .note-title 
        {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          width: 90%;
          font-size: 16px;
          padding: 5px;
          border: none;
          border-radius: 5px;
          background: transparent;
          color: white;
        }

        .note-title::placeholder 
        {
          font-size: 14px;
          color: grey;
        }

        .note-detail 
        {
          display: none;
          flex-direction: column;
          gap: 10px;
        }

        .note-detail.visible 
        {
          display: flex;
        }

        .hidden 
        {
          display: none;
        }

        .back-button 
        {
          background-color: transparent;
          align-self: start;
          font-size: 1.2em;
          color: white;
          border: none;
          cursor: pointer;
          margin-bottom: 10px;
          padding: 5px 5px 5px 10px;
          transition: opacity 0.2s; 
        }

        .back-button:active 
        {
          opacity: 0.6; 
        }

        .note-content 
        {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .note-checkbox 
        {
          margin-right: 10px;
          display: none;
        }

        .note-checkbox.visible 
        {
          display: inline-block;
        }

        .note-headline 
        {
          display: inline-flex;
          align-items: start;
          padding-top: 2%;
        }

        #note-title-heading 
        {
          margin-bottom: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 1.2em;
          font-weight: bold;
          width: 100%;
          border: none;
          background: transparent;
          color: white;
          outline: none;
        }

        #quicknotes-buttons-container 
        {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        #btn_gemini 
        {
          width: 100%;
          padding: 10px;
          font-size: 1em;
          background-color: rgba(0, 0, 0, 0.499); 
          border-radius: 15px;
          color: white;
          border: none;
          cursor: pointer;
          text-align: center;
        }

        .bullet-point 
        {
          background: none;
          display: flex;
          align-items: flex-start;
          width: 100%;
          position: relative; 
        }

        .bullet-point::before 
        {
          content: "•";
          padding-top: 5px;
          margin-right: 10px;
          margin-left: 10px;
          color: white;
          position: absolute; 
          left: 0; 
        }

        .bullet-point textarea 
        {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          width: calc(100% - 30px); 
          padding: 5px;
          border: none;
          background: transparent;
          color: white;
          border-radius: 5px;
          resize: none; 
          overflow-x: hidden; 
          overflow-y: hidden; 
          white-space: pre-wrap; 
          word-wrap: break-word; 
          box-sizing: border-box;
          margin-left: 30px;
        }

        .bullet-point textarea::placeholder 
        {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: rgba(255, 255, 255, 0.60);
        }

        .bullet-point textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
        }

        .empty-state 
        {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1em;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          margin-top: 30%;
        }

        .hidden 
        {
          display: none;
        }

        .note-title[contenteditable="true"] 
        {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .note-title[contenteditable="false"] 
        {
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
        }

        .note-title-input 
        {
          width: 100%;
          border: none;
          background: transparent;
          color: white;
          font-size: 1.2em;
          font-weight: bold;
          padding: 5px;
          margin-bottom: 10px;
        }

        .note-title-input:focus 
        {
          outline: none;
        }
        
        `;
        
        shadow.appendChild(styleSheet);

        let sidebarContent = document.createElement('div');
          
        sidebarContent.innerHTML = `
          
        <div id="quicknotes-buttons">
            <div id="close-button" class="circle-button">
              <span class="line line1"></span>
              <span class="line line2"></span>
            </div>
            <div style="flex-grow: 1;"></div> 
            <div id="plus-button" class="circle-button">
              <span class="line line1"></span>
              <span class="line line2"></span>
            </div>
            <div id="minus-button" class="circle-button">
              <span class="line line1"></span>
              <span class="line line2"></span>
            </div>
          </div>
          <h2 id="main-heading">My Notes</h2>
          <div id="notes-list" class="notes-list"></div> 
          <div id="empty-state" class="empty-state hidden">Tap the + icon above to get started.</div>
          <div id="note-detail" class="note-detail hidden">
            <div class="note-headline">
              <button id="back-button" class="back-button">&#8592;</button>
              <input type="text" id="note-title-heading" class="note-title-input" />
            </div>
            <div id="note-content" class="note-content"></div>
            <div id="quicknotes-buttons-container" class="quicknotes-buttons-container">
              <button id="btn_gemini">Append Summary of Current Webpage</button>
            </div>
          </div>
        
        `;

        shadow.appendChild(sidebarContent);

        document.body.appendChild(sidebarContainer);

        loadNotes();

        chrome.storage.sync.get('quicknotesState', (data) => 
        
        {
          if (data.quicknotesState) 
          
          {
            const { isShowing, currentView } = data.quicknotesState;

            if (isShowing) 
            
            {
              sidebarContainer.classList.add('show');
            }
            
            if (currentView === 'detail') 
            
            {
              shadow.querySelector('#notes-list').classList.add('hidden');
              shadow.querySelector('#note-detail').classList.add('visible');
            } 
            
            else 
            
            {
              shadow.querySelector('#notes-list').classList.remove('hidden');
              shadow.querySelector('#note-detail').classList.remove('visible');
            }
          
          }
        
        });

        let summariesCache = {}; 

        function getCurrentTabUrl(callback) 
        
        {
          chrome.runtime.sendMessage({ action: "getCurrentTabUrl" }, function(response) 
          
          {
            if (chrome.runtime.lastError) 
              
            {
              console.error(chrome.runtime.lastError);
              return;
            }
            
            if (response && response.url) 
              
            {
              callback(response.url);
            } 
            
            else 
            
            {
              console.error('No URL found.');
            }
          });
        }

        function adjustTextareaHeight(textarea) 
        
        {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }

        function displaySummary(summary) 
        
        {
        
          const noteContent = shadow.querySelector('#note-content');
        
          let sentences = summary.split('. ').map(s => s.trim() + '.');
        
          sentences.forEach((sentence, index) => 
            
          {
            setTimeout(() => 
            
            {
              const bulletPoint = document.createElement('div');
            
              bulletPoint.className = 'bullet-point';
              bulletPoint.innerHTML = `<textarea>${sentence}</textarea>`;
              noteContent.append(bulletPoint);

              const textarea = bulletPoint.querySelector('textarea');
            
              textarea.addEventListener('keydown', handleBulletPointInput);
              textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
              adjustTextareaHeight(textarea);
            
            }, index * 200); 
          
          });
        }

        shadow.querySelector('#btn_gemini').addEventListener('click', () => 
          
        {
          getCurrentTabUrl((url) => 
            
          {
            if (summariesCache[url]) 
              
            {
              displaySummary(summariesCache[url]);
            } 
            
            else 
            
            {
              
              let btnGemini = shadow.querySelector('#btn_gemini');
              
              btnGemini.disabled = true;
              btnGemini.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

              fetch(GEMINI_API_URL, 
                
              {
                method: "POST",
                body: JSON.stringify({
                  contents: [{
                    parts: [{
                      text: `Please summarize the content of this webpage: ${url}. Follow this format exactly: write a single paragraph summary without any formatting (no bold text, lists, headings, etc.). The summary must be concise, consisting of no more than 10 sentences. Each sentence should be complete and distinct, as I will split the summary into individual sentences for further processing.`
                    }]
                  }]
                }),
              })
              
              .then((response) => response.json())
              
              .then((result) => 
                
              {
              
                let summary = result["candidates"][0]["content"]["parts"][0]["text"];
                summariesCache[url] = summary; 
              
                displaySummary(summary);
              
                btnGemini.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                btnGemini.disabled = false;
              
              });
        
            }
          
          });
        
        });

        shadow.querySelector('#close-button').addEventListener('click', () => 
          
        {
          sidebarContainer.classList.remove('show');
          saveState(false);
        });

        shadow.querySelector('#plus-button').addEventListener('click', () => 
          
        {
          const notesList = shadow.querySelector('#notes-list');
          const newNote = document.createElement('div');
        
          newNote.className = 'note';
          newNote.setAttribute('data-id', new Date().getTime().toString()); 
          newNote.innerHTML = `<div class="note-title" contenteditable="true"></div>`;
          notesList.prepend(newNote); 

          const noteTitleDiv = newNote.querySelector('.note-title');
          
          noteTitleDiv.addEventListener('blur', () => 
            
          {
          
            if (noteTitleDiv.textContent.trim() === '') 
              
            {
              newNote.remove();
              loadNotes(); 
            } 
            
            else 
            
            {
              noteTitleDiv.contentEditable = "false";
              noteTitleDiv.addEventListener('click', () => openNoteDetail(newNote.getAttribute('data-id')));
              openNoteDetail(newNote.getAttribute('data-id'));
              saveNotes();
            }
        
          });

          noteTitleDiv.focus();
          shadow.querySelector('#empty-state').classList.add('hidden');
        
        });

        shadow.querySelector('#back-button').addEventListener('click', () => 
          
        {
          saveNoteDetail(shadow.querySelector('#note-content').getAttribute('data-id')); 
          
          shadow.querySelector('#notes-list').classList.remove('hidden');
          shadow.querySelector('#note-detail').classList.remove('visible');
          shadow.querySelector('#main-heading').classList.remove('hidden');
          shadow.querySelector('#quicknotes-buttons').classList.remove('hidden');
          shadow.querySelector('#close-button').classList.remove('hidden');
          shadow.querySelector('#minus-button').classList.remove('hidden');
          shadow.querySelector('#plus-button').classList.remove('hidden');
          
          saveState(true);
        });

        shadow.querySelector('#note-title-heading').addEventListener('blur', () => 
          
        {
          const noteId = shadow.querySelector('#note-content').getAttribute('data-id');
          const newTitle = shadow.querySelector('#note-title-heading').value.trim();
          const noteTitleDiv = shadow.querySelector(`.note[data-id="${noteId}"] .note-title`);
        
          if (newTitle !== '') 
            
          {
            noteTitleDiv.textContent = newTitle;
            
            saveNotes(); 
          }
        
        });

        shadow.querySelector('#minus-button').addEventListener('click', () => 
          
        {
          if (isDeleting) 
            
          {
            const checked = shadow.querySelectorAll('.note-checkbox.visible:checked');
          
            if (checked.length > 0) 
              
            {
              deleteSelectedNotes();
            } 
            
            else 
            
            {
              toggleDeleteMode();
            }
          } 
          
          else 
          
          {
            toggleDeleteMode();
          }
        
        });

        let isDeleting = false; 

        function toggleDeleteMode() 
        
        {
          
          const notesList = shadow.querySelector('#notes-list');
          const checkboxes = notesList.getElementsByClassName('note-checkbox');
          const minusButton = shadow.querySelector('#minus-button');

          isDeleting = !isDeleting;

          
          for (let checkbox of checkboxes) 
            
          {
            checkbox.classList.toggle('visible', isDeleting);
          }

          
          if (isDeleting) 
            
          {
          
            if (checkboxes.length === 0) 
            
            {
              isDeleting = false;
              return;
            }
            
            minusButton.querySelector('.line1').style.transform = 'rotate(45deg)';
            minusButton.querySelector('.line2').style.transform = 'rotate(-45deg)';
          
          } 
          
          else 
          
          {
          
            minusButton.style.backgroundColor = '';
            minusButton.querySelector('.line1').style.transform = 'rotate(0deg)';
            minusButton.querySelector('.line2').style.transform = 'rotate(0deg)';
          
          }
        }

        function saveNotes() 
        
        {
        
          const notesList = shadow.querySelector('#notes-list');
        
          const notes = Array.from(notesList.getElementsByClassName('note')).map(note => 
            
          {
            
            const noteTitle = note.querySelector('.note-title').textContent.trim();
            const noteId = note.getAttribute('data-id');
          
            return { id: noteId, title: noteTitle };
          
          });

          chrome.storage.sync.set({ notes }, () => 
            
          {
            
            if (chrome.runtime.lastError) 
              
            {
              console.error(`Error saving notes: ${chrome.runtime.lastError}`);
            }
          
          });
        
        }

        function saveNoteDetail(noteId) 
        
        {
        
          const noteContent = shadow.querySelector('#note-content');
          const bulletPoints = Array.from(noteContent.querySelectorAll('.bullet-point textarea')).map(textarea => textarea.value);
          
          chrome.storage.sync.get('noteDetails', (data) => 
            
          {
          
            const noteDetails = data.noteDetails || {};
            noteDetails[noteId] = bulletPoints;
            
            chrome.storage.sync.set({ noteDetails }, () => 
              
            {
              
              if (chrome.runtime.lastError) 
              
              {
                console.error(`Error saving note details: ${chrome.runtime.lastError}`);
              }
            
            });
          
          });
        
        }

        function loadNotes() 
        
        {
          chrome.storage.sync.get(['notes', 'noteDetails'], (data) => 
            
          {
            if (chrome.runtime.lastError) 
              
            {
              console.error(`Error loading notes: ${chrome.runtime.lastError}`);
            
              return;
            }

            const notesList = shadow.querySelector('#notes-list');
            const emptyState = shadow.querySelector('#empty-state');
            
            notesList.innerHTML = '';

            if (data.notes && data.notes.length > 0) 
            
            {
            
              data.notes.forEach(note => 
              
              {
                const noteElement = document.createElement('div');
              
                noteElement.className = 'note';
                noteElement.setAttribute('data-id', note.id);
              
                noteElement.innerHTML = `
                  <input type="checkbox" class="note-checkbox">
                  <div class="note-title">${note.title}</div>
                `;
              
                notesList.append(noteElement);
              
                noteElement.querySelector('.note-title').addEventListener('click', () => openNoteDetail(note.id));
                noteElement.querySelector('.note-checkbox').addEventListener('change', handleNoteCheckboxChange);
              
              });
              
              emptyState.classList.add('hidden');
            
            } 
            
            else 
            
            {
              emptyState.classList.remove('hidden');
            }
          
          });
        
        }

        function handleNoteCheckboxChange() 
        
        {
        
          const checkboxes = shadow.querySelectorAll('.note-checkbox.visible');
          const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
          const minusButton = shadow.querySelector('#minus-button');

          if (checked) 
            
          {
        
            minusButton.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            minusButton.querySelector('.line1').style.transform = 'rotate(45deg)';
            minusButton.querySelector('.line2').style.transform = 'rotate(-45deg)';
          
          } 
          
          else 
          
          {
          
            minusButton.style.backgroundColor = '';
            minusButton.querySelector('.line1').style.transform = 'rotate(45deg)';
            minusButton.querySelector('.line2').style.transform = 'rotate(-45deg)';
          
          }
        
        }

        function deleteSelectedNotes() 
        
        {
        
          const notesList = shadow.querySelector('#notes-list');
          const checkboxes = notesList.querySelectorAll('.note-checkbox.visible:checked');

          checkboxes.forEach(checkbox => { checkbox.parentElement.remove(); });

          saveNotes();
          
          toggleDeleteMode();

          const remainingNotes = notesList.getElementsByClassName('note').length;

          const emptyState = shadow.querySelector('#empty-state');

          if (remainingNotes === 0) 
            
          {
            emptyState.classList.remove('hidden');
          }
        
        }

        function openNoteDetail(noteId) 
        
        {
        
          shadow.querySelector('#notes-list').classList.add('hidden');
          shadow.querySelector('#note-detail').classList.add('visible');
          shadow.querySelector('#main-heading').classList.add('hidden');
          shadow.querySelector('#quicknotes-buttons').classList.add('hidden');
          shadow.querySelector('#close-button').classList.add('hidden');
          shadow.querySelector('#minus-button').classList.add('hidden');
          shadow.querySelector('#plus-button').classList.add('hidden');

          const noteTitleHeading = shadow.querySelector('#note-title-heading');
          const noteTitle = shadow.querySelector(`.note[data-id="${noteId}"] .note-title`).textContent.trim();
        
          noteTitleHeading.value = noteTitle;

          const noteContent = shadow.querySelector('#note-content');
        
          noteContent.innerHTML = '';
          noteContent.setAttribute('data-id', noteId);

          chrome.storage.sync.get('noteDetails', (data) => 
            
          {
          
            const bulletPoints = data.noteDetails && data.noteDetails[noteId] || [];
          
            bulletPoints.forEach(point => 
              
            {
            
              const bulletPoint = document.createElement('div');
            
              bulletPoint.className = 'bullet-point';
              bulletPoint.innerHTML = `<textarea>${point}</textarea>`;
            
              noteContent.append(bulletPoint);
            
              bulletPoint.querySelector('textarea').addEventListener('keydown', handleBulletPointInput);
              bulletPoint.querySelector('textarea').addEventListener('input', () => adjustTextareaHeight(bulletPoint.querySelector('textarea')));
            
              adjustTextareaHeight(bulletPoint.querySelector('textarea'));
            
            });

            if (bulletPoints.length === 0) 
              
            {
            
              const bulletPoint = document.createElement('div');
            
              bulletPoint.className = 'bullet-point';
              bulletPoint.innerHTML = `<textarea placeholder="Tip: Enter = New Point, Backspace = Delete Point."></textarea>`;
            
              noteContent.append(bulletPoint);
            
              bulletPoint.querySelector('textarea').addEventListener('keydown', handleBulletPointInput);
              bulletPoint.querySelector('textarea').addEventListener('input', () => adjustTextareaHeight(bulletPoint.querySelector('textarea')));
            
              adjustTextareaHeight(bulletPoint.querySelector('textarea'));
            
            }
          
          });
        
        }

        function handleBulletPointInput(event) 
        
        {
          if (event.key === 'Enter') 
            
          {
          
            event.preventDefault(); 
            
            const newBulletPoint = document.createElement('div');
            
            newBulletPoint.className = 'bullet-point';
            newBulletPoint.innerHTML = `<textarea placeholder="Type here"></textarea>`;
            
            event.target.parentElement.insertAdjacentElement('afterend', newBulletPoint);

            const textarea = newBulletPoint.querySelector('textarea');
            
            textarea.focus();
            
            textarea.addEventListener('keydown', handleBulletPointInput);
            textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
            
            adjustTextareaHeight(textarea);
          } 
          
          else if (event.key === 'Backspace' && event.target.value === '') 
            
          {
          
            const parent = event.target.parentElement;
          
            if (parent.previousElementSibling) 
              
            {
            
              parent.previousElementSibling.querySelector('textarea').focus();
              parent.remove();
            
            }
          
          } 
        
        }

        loadNotes();
      }
    };

    window.toggleSidebar = function() 
    
    {
    
      let sidebar = document.getElementById('quicknotes-sidebar');
    
      if (sidebar) 
        
      {
        const isShowing = sidebar.classList.toggle('show');
        saveState(isShowing);
      } 
      
      else 
      
      {
      
        createSidebar();
        document.getElementById('quicknotes-sidebar').classList.add('show');
        saveState(true);
      
      }
    
    };   

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => 
      
    {
    
      if (message.action === 'updateState' && message.state.isShowing) 
        
      {
      
        const sidebar = document.getElementById('quicknotes-sidebar');
      
        if (sidebar && !sidebar.classList.contains('show')) 
          
        {
          sidebar.classList.remove('show');
        }
      
      }
      
      if (message.action === 'closeSidebar') 
        
      {
      
        const sidebar = document.getElementById('quicknotes-sidebar');
      
        if (sidebar) 
          
        {
          sidebar.classList.remove('show');
        }
      
      }
    
    });

    function saveState(isShowing) 
    
    {
    
      if (!shadow) return;
    
      const noteDetail = shadow.querySelector('#note-detail');
      const notesList = shadow.querySelector('#notes-list');
    
      if (!noteDetail || !notesList) return;
    
      const currentView = noteDetail.classList.contains('visible') ? 'detail' : 'list';
    
      const state = { isShowing, currentView };
    
      chrome.storage.sync.set({ quicknotesState: state }, () => { chrome.runtime.sendMessage({ action: 'updateState', state }); });
    
    }

  }
  
})();
