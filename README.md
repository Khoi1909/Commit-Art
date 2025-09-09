# 🎨 GitHub Contribution Graph Art

Create beautiful art on your GitHub contribution graph using automated commits!

## 🌟 What is this?

This project lets you "draw" on your GitHub contribution graph (the green squares) by creating commits on specific dates. You can design custom patterns, text, or art that will appear on your GitHub profile.

## 🚀 Quick Start
###
FIRST YOU HAVE TO CLONE THIS AND DELETE THE `.git` FOLDER THEN CREATE YOUR OWN REPO (Public or Private)
### 1. Design Your Art
Open `designer.html` in your browser to create your art:
- Click on squares to paint them
- Choose different green levels (0-4)
- Click week numbers to fill entire columns
- Export your pattern when done

### 2. Update the Code
Copy the exported pattern and replace the `PATTERN` array in `index.js`

### 3. Run the Script
```bash
npm install
npm start
```

### 4. Push to GitHub
```bash
git push origin main
```

Your art will appear on your GitHub contribution graph! 🎉

## 📝 Configuration

Edit these settings in `index.js`:
- `AUTHOR.name` - Your GitHub username
- `AUTHOR.email` - Your GitHub email
- `START_DATE` - When to start drawing (use past dates)

## ⚠️ Important Notes

- Use a **separate repository** for art (you can delete it later)
- Make sure the repository is **public** or enable private contributions
- Commits use **past dates** (2023) to appear correctly on the graph
- Each number (0-4) creates different commit amounts for varying green intensity

## 🎯 Tips

- Start with simple designs before complex ones
- Use the web designer to preview before running
- You can clear and redesign anytime
- Test with small patterns first

Enjoy creating your GitHub art! 🚀
