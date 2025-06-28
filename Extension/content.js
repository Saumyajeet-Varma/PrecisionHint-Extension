const SERVER_URL = "http://localhost:3000";

const getProblemTitle = () => {

    if (window.location.hostname.includes("leetcode")) {
        const parts = window.location.pathname.split('/');
        return parts[2] || 'Unknown Problem';
    }

    if (window.location.hostname.includes('geeksforgeeks')) {
        return document.title.split('-')[0].trim() || 'Unknown Problem';
    }

    return "Unknown Problem";
};

const fetchHints = async (problemTitle) => {

    try {
        const response = await fetch(`${SERVER_URL}/get-hint?problem=${encodeURIComponent(problemTitle)}`);

        if (!response.ok) {
            throw new Error('Server error');
        }

        return await response.json();
    }
    catch (error) {
        console.error('API call failed:', error);
        return { basic: 'Error in Fetching Hints', detailed: 'Error in Fetching Hints' };
    }
};

if (!document.getElementById('hint-button')) {

    const button = document.createElement("button");
    button.id = "hint-button";
    button.textContent = "💡HINT";

    Object.assign(button.style, {
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        zIndex: '9999',
        padding: '10px 15px 10px 10px',
        background: '#1e1e1e',
        color: '#e0e0e0',
        border: '1px solid #444',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
    });

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = '⌛LOADING...';

        const problemTitle = getProblemTitle();
        const data = await fetchHints(problemTitle);

        showHintPopup(data.hints.basic, data.hints.detailed);
        button.textContent = '💡HINT';
        button.disabled = false;
    });

    document.body.appendChild(button);
}

function showHintPopup(basicHint, detailedHint) {

    if (document.getElementById('hint-popup')) {
        return;
    }

    const popup = document.createElement('div');
    popup.id = 'hint-popup';
    Object.assign(popup.style, {
        position: 'fixed',
        bottom: '130px',
        right: '20px',
        width: '300px',
        background: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        zIndex: '10000',
        fontSize: '14px',
        color: '#e0e0e0',
        fontFamily: 'sans-serif'
    });

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '❌';
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '5px',
        right: '10px',
        cursor: 'pointer'
    });
    closeBtn.addEventListener('click', () => popup.remove());
    popup.appendChild(closeBtn);

    const basicPara = document.createElement('p');
    basicPara.textContent = `💡 Basic Hint: ${basicHint}`;
    basicPara.style.marginBottom = '10px';
    popup.appendChild(basicPara);

    const detailedPara = document.createElement('p');
    detailedPara.textContent = `💡 Detailed Hint: ${detailedHint}`;
    detailedPara.style.display = 'none';
    popup.appendChild(detailedPara);

    const showMoreBtn = document.createElement('button');
    showMoreBtn.textContent = 'Show More';
    Object.assign(showMoreBtn.style, {
        marginTop: '10px',
        padding: '5px 10px',
        background: '#333',
        color: '#e0e0e0',
        border: '1px solid #555',
        borderRadius: '4px',
        cursor: 'pointer'
    });

    showMoreBtn.addEventListener('click', () => {
        detailedPara.style.display = 'block';
        showMoreBtn.style.display = 'none';
    });

    popup.appendChild(showMoreBtn);
    document.body.appendChild(popup);
}
