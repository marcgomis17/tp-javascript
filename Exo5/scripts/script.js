var buttons = document.querySelectorAll('button');
var zIndex = 0;

function buildNotif() {
    var notificationPanel = document.createElement('div');
    var notificationText = document.createElement('div');
    var notificationTitle = document.createElement('p');
    var notificationMesssage = document.createElement('p');

    notificationPanel.className = "notification-panel";
    notificationPanel.id = "notification-panel";
    notificationText.className = "notification-text";
    notificationTitle.className = "notification-title";
    notificationMesssage.className = "notification-message";

    notificationText.append(notificationTitle, notificationMesssage);
    notificationPanel.appendChild(notificationText);
    return notificationPanel;
}

buttons.forEach(button => {
    button.onclick = () => {
        var notificationPanel = buildNotif();
        var notificationTitle = notificationPanel.querySelector('.notification-title');
        var notificationMesssage = notificationPanel.querySelector('.notification-message');
        notificationMesssage.innerText = "This is the notification message";
        var panelsContainer = document.querySelector('.panels-container');
        panelsContainer.appendChild(notificationPanel);
        if (button.classList.contains('btn-success')) {
            notificationTitle.innerText = "Success";
            notificationPanel.classList.add('success', 'show');
            console.log(notificationPanel);
        }
        if (button.classList.contains('btn-danger')) {
            notificationTitle.innerText = "Alert";
            notificationPanel.classList.add('error', 'show');
        }
        if (button.classList.contains('btn-warning')) {
            notificationTitle.innerText = "Warning";
            notificationPanel.classList.add('warning', 'show');
        }
        if (button.classList.contains('btn-info')) {
            notificationTitle.innerText = "Info";
            notificationPanel.classList.add('info', 'show');
        }
    }
});

