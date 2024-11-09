const repoOwner = "multiverseweb";  // Repository owner for CodeIt
const repoName = "CodeIt";          // Repository name for CodeIt

// URLs to fetch data
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

// Fetch data from GitHub API with pagination
async function fetchContributorData() {
  try {
    const contributors = [];
    let page = 1;
    let response;
    let contributorsData;

    // Loop to fetch all contributors across multiple pages
    do {
      response = await fetch(`${contributorsUrl}?page=${page}&per_page=100`);
      contributorsData = await response.json();

      if (response.ok && Array.isArray(contributorsData)) {
        contributors.push(...contributorsData);
        page++;
      } else {
        throw new Error(`Failed to fetch contributors on page ${page}`);
      }

    return { contributors, repoStats: repoData };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { contributors: [], repoStats: {} };
  }
}

// Render stats
function renderStats(repoStats, contributors) {

  const statsGrid = document.getElementById('statsGrid');
  
  
  // Calculate total contributions from the fetched contributors data
  const totalContributions = contributors.reduce((sum, contributor) => sum + contributor.contributions, 0);

  const stats = [
    { label: 'Contributors', value: contributors.length, icon: 'users' },
    { label: 'Total Contributions', value: totalContributions, icon: 'git-commit' },
    { label: 'GitHub Stars', value: repoStats.stargazers_count || 0, icon: 'star' },
    { label: 'Forks', value: repoStats.forks_count || 0, icon: 'git-branch' }
  ];

  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="icon">${getIcon(stat.icon)}</div>
      <h3>${stat.value}</h3>
      <p>${stat.label}</p>
    </div>
  `).join('');
}

    const repoResponse = await fetch(repoUrl);
    const repoData = await repoResponse.json();

    const statsGrid = document.getElementById("statsGrid");

async function init() {

  const loading = document.getElementById('loading');
  const contributorsGrid = document.getElementById('contributorsGrid');

    statsGrid.innerHTML = `
      <div class="contributor-stat-card"><h3>${contributors.length}</h3><p>Contributors</p></div>
      <div class="contributor-stat-card"><h3>${contributors.reduce((sum, { contributions }) => sum + contributions, 0)}</h3><p>Total Contributions</p></div>
      <div class="contributor-stat-card"><h3>${repoData.stargazers_count}</h3><p>GitHub Stars</p></div>
      <div class="contributor-stat-card"><h3>${repoData.forks_count}</h3><p>Forks</p></div>
    `;

    // Display each contributor's data (avatar, username, and contributions)
    const contributorsContainer = document.getElementById("contributors");
    contributorsContainer.innerHTML = contributors.map(({ login, contributions, avatar_url, html_url }) => `
      <div class="contributor-card" style="--clr:rgba(255,255,255,0.26)">
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

  // Pass both the repoStats and contributors array to renderStats
  renderStats(repoStats, contributors);
  renderContributors(contributors);

  loading.style.display = 'none';
  contributorsGrid.style.display = 'grid';

}


// Handle form submission
document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  const notification = document.getElementById('notification');
  
  notification.textContent = `Thank you for subscribing with ${email}. We'll keep you updated!`;
  notification.classList.remove('hidden');
  
  document.getElementById('emailInput').value = '';
  
  setTimeout(() => {
      notification.classList.add('hidden');
  }, 5000);
});

      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
    });
  });
}

// Call the function to fetch and display data
fetchContributorData();
