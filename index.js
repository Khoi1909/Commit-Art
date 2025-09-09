const simpleGit = require('simple-git');
const fs = require('fs');
const { addDays, format } = require('date-fns');

// CONFIGURATION
const REPO_PATH = '.'; // Current directory
const AUTHOR = {
  name: 'Khoi1909',
  email: 'kn24524@gmail.com'
};
const MESSAGE = 'Green square!';

const START_DATE = new Date('2023-01-01'); // Start at beginning of year for full-width art
// 7 rows, 52 columns (weeks)
// 0 = no commit, 1 = commit (white pixel in the image)
// Exact mapping from the grid image
// GitHub Contribution Graph Pattern (7 rows x 52 columns)
// 0 = no commits, 1-4 = increasing commit intensity
const PATTERN = [
  [0,0,0,0,4,0,0,0,0,0,4,1,0,0,1,4,0,4,0,4,4,4,2,0,3,4,4,4,3,0,3,3,0,0,4,0,0,0,3,3,0,0,0,3,1,0,0,0,1,3,0,0],
  [0,0,0,2,4,2,0,0,0,0,2,4,0,0,4,2,0,4,0,3,0,0,0,0,0,0,4,0,0,0,4,3,0,0,4,0,0,1,3,3,2,0,0,4,3,0,0,0,3,4,0,0],
  [1,4,4,4,4,4,4,4,1,0,0,4,0,0,4,0,0,4,0,3,0,0,0,0,0,0,4,0,0,0,4,4,3,0,4,0,0,3,2,1,3,0,0,4,3,1,0,1,3,4,0,0],
  [0,1,3,4,4,4,4,1,0,0,0,4,1,1,4,0,0,4,0,4,4,4,2,0,0,0,4,0,0,0,4,0,4,0,4,0,0,3,0,0,3,0,0,4,3,3,0,3,3,4,0,0],
  [0,0,1,4,4,4,2,0,0,0,0,4,2,3,4,0,0,4,0,3,0,0,0,0,0,0,4,0,0,0,4,0,4,3,4,0,0,3,3,3,3,0,0,4,0,3,0,3,0,4,0,0],
  [0,0,2,4,2,4,1,0,0,0,0,1,4,4,1,0,0,4,0,3,0,0,0,0,0,0,4,0,0,0,4,0,0,4,4,0,1,3,0,0,3,3,0,4,0,2,4,2,0,4,0,0],
  [0,0,4,1,0,1,4,0,0,0,0,0,4,4,0,0,0,4,0,4,4,4,2,0,0,0,4,0,0,0,4,0,0,3,3,0,3,2,0,0,1,3,0,4,0,0,4,0,0,4,0,0]
];
// Preview the pattern as ASCII art
function previewPattern(pattern) {
  return pattern.map(row => row.map(cell => cell ? '#' : ' ').join('')).join('\n');
}
console.log(previewPattern(PATTERN));


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function makeCommits() {
  const git = simpleGit(REPO_PATH);
  let daysSinceLastPush = 0;
  // Loop over columns (weeks)
  for (let col = 0; col < PATTERN[0].length; col++) {
    // Loop over rows (days of week)
    for (let row = 0; row < PATTERN.length; row++) {
      if (PATTERN[row][col]) {
        // Calculate the date for this cell
        const commitDate = addDays(START_DATE, col * 7 + row);
        const dateStr = format(commitDate, "yyyy-MM-dd'T'HH:mm:ss");
        // You can increase the number of commits per cell for darker green
        const commitCount = PATTERN[row][col];
        for (let i = 0; i < commitCount; i++) {
          fs.writeFileSync('dummy.txt', `${dateStr} - ${Math.random()}`);
          await git.add('dummy.txt');
          await git.commit(MESSAGE, 'dummy.txt', {
            '--date': dateStr,
            '--author': `${AUTHOR.name} <${AUTHOR.email}>`
          });
          console.log(`Committed on ${dateStr}`);
        }
        daysSinceLastPush++;
        if (daysSinceLastPush >= 70) { // push every 70 commits (10 weeks)
          await git.push('origin', 'main');
          console.log('Pushed commits to GitHub after 70 commits.');
          daysSinceLastPush = 0;
        }
      }
    }
  }
  // Final push if any days left
  if (daysSinceLastPush > 0) {
    await git.push('origin', 'main');
    console.log('Final push to GitHub.');
  }
  console.log('Done! Push your commits to GitHub to update the graph.');
}

makeCommits();
