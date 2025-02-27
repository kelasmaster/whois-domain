document.getElementById('whoisForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const domain = document.getElementById('domain').value;
  const resultDiv = document.getElementById('result');
  const whoisData = document.getElementById('whoisData');

  // Clear previous results
  resultDiv.classList.add('d-none');
  whoisData.textContent = '';

  try {
    const response = await fetch('/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    });

    const data = await response.json();

    if (response.ok) {
      whoisData.textContent = JSON.stringify(data, null, 2);
      resultDiv.classList.remove('d-none');
    } else {
      alert(data.error || 'An error occurred');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to fetch WHOIS data');
  }
});
