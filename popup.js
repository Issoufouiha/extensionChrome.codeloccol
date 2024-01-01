document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addLinkButton').addEventListener('click', addLink);
    loadLinks();
  })
  function loadLinks() {
    chrome.storage.sync.get('links', function(data) {
      var links = data.links || [];
      var list = document.getElementById('linksList');
      list.innerHTML = '';
  
      links.forEach(function(link) {
        var listItem = document.createElement('li');
        listItem.textContent = link;
        list.appendChild(listItem);
      });
    });
  }
  
  function addLink() {
    var input = document.getElementById('linkInput');
    var link = input.value.trim();
  
    if (link !== '') {
      chrome.storage.sync.get('links', function(data) {
        var links = data.links || [];
        links.push(link);
  
        chrome.storage.sync.set({ 'links': links }, function() {
          input.value = '';
          loadLinks();
        });
      });
    }
  }
  