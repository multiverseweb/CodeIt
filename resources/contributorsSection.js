// contributor.js

const repoOwner = "multiverseweb";  // Repository owner for CodeIt
const repoName = "CodeIt";          // Repository name for CodeIt

// URLs to fetch data
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

async function fetchContributorData() {
  try {
    // Fetch both contributors and repository data at the same time
    const [contributorsRes, repoRes] = await Promise.all([
      fetch(contributorsUrl),
      fetch(repoUrl)
    ]);

    // Parse the JSON responses
    const contributors = await contributorsRes.json();
    const repoData = await repoRes.json();

    // Display project stats in a grid
    const statsGrid = document.getElementById("statsGrid");

    statsGrid.innerHTML = `
      <div class="contributor-stat-card"><h3>${contributors.length}</h3><p>Contributors</p></div>
      <div class="contributor-stat-card"><h3>${contributors.reduce((sum, { contributions }) => sum + contributions, 0)}</h3><p>Total Contributions</p></div>
      <div class="contributor-stat-card"><h3>${repoData.stargazers_count}</h3><p>GitHub Stars</p></div>
      <div class="contributor-stat-card"><h3>${repoData.forks_count}</h3><p>Forks</p></div>
    `;

    // Display each contributor's data (avatar, username, and contributions)
    const contributorsContainer = document.getElementById("contributors");
    contributorsContainer.innerHTML = contributors.map(({ login, contributions, avatar_url, html_url }) => `
      <div class="contributor-card" style="--clr:rgba(255,255,255,0.08)">
        <img src="${avatar_url}" alt="${login}'s avatar">
        <p><strong>${login}</strong></p>
        <p>Contributions: ${contributions}</p>
        <a href="${html_url}" target="_blank">GitHub Profile</a>
      </div>
    `).join('');

    // Apply the mouse effect to each contributor card
    applyMouseEffectToCards();

  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching data:", error);
  }
}

// Function to apply the mouse effect to the contributor cards
function applyMouseEffectToCards() {
  const cards = document.querySelectorAll('.contributor-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
    });
  });
}

// Call the function to fetch and display data
fetchContributorData();
