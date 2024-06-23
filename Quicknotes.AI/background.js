chrome.runtime.onInstalled.addListener(() => 
{
  chrome.tabs.query({}, (tabs) => 
  
  {
  
    tabs.forEach(tab => 
    
    {
  
      if (tab.id) 
      
      {
        injectContentScripts(tab.id);
      }
    
    });
  
  });

});

chrome.action.onClicked.addListener((tab) => 
{
  injectContentScripts(tab.id, () => 
  
  {
    chrome.scripting.executeScript({ target: { tabId: tab.id },
      func: () => 
      {
        toggleSidebar();
      }
    });
  });
});

function injectContentScripts(tabId, callback) 
{
  chrome.scripting.insertCSS(
  
  { target: { tabId: tabId }, files: ['content.css'] }, 
  
  () => 
  
  {
    chrome.scripting.executeScript({ target: { tabId: tabId }, files: ['sidebar.js'] }, callback);
  }

  );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => 
{
  
  if (request.action === "getCurrentTabUrl") 
  
  {
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) 
    
    {
      let currentTab = tabs[0];
      sendResponse({ url: currentTab.url });
    });
    
    return true; 
  
  }
  
  if (request.action === 'updateState') 
    
  {
    
    chrome.storage.sync.set({ quicknotesState: request.state }, () => 
    
    {
      chrome.tabs.query({}, (tabs) => 
      
      {
        tabs.forEach(tab => 
          
        {
          if (tab.id !== sender.tab.id) 
          
          {
            chrome.tabs.sendMessage(tab.id, { action: 'closeSidebar' });
          }
        
        });
      
      });
    
    });
  }
});