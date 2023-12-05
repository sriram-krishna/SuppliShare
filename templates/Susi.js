document.addEventListener('DOMContentLoaded', function() {
    customizeSocialLoginButtons();
    customizeLoginForm();
    moveForgotPasswordLink();
    alignKeepMeSignedInWithForgotPassword();
    console.log("SUCCESS!");
});

function alignKeepMeSignedInWithForgotPassword() {
    const rememberMeContainer = document.querySelector('.rememberMe');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const signInButton = document.getElementById('next');

    if (rememberMeContainer && forgotPasswordLink && signInButton) {
        // Create a container to hold both the rememberMe checkbox and forgotPassword link
        const container = document.createElement('div');
        container.className = 'credentials-container';

        // Move the rememberMeContainer and forgotPasswordLink into this new container
        container.appendChild(rememberMeContainer);
        container.appendChild(forgotPasswordLink);

        // Place the new container above the Sign in button
        signInButton.parentNode.insertBefore(container, signInButton);
    } else {
        setTimeout(moveForgotPasswordLink, 500); // Retry if elements are not found
    }
}


function customizeSocialLoginButtons() {
    const googleButton = document.getElementById('GoogleExchange');
    const facebookButton = document.getElementById('FacebookExchange');
    const retryInterval = 500;

    if (googleButton && facebookButton) {
        addIconToButton(googleButton, 'https://supplishareblobstorage.blob.core.windows.net/static/assets/icon-google.png');
        addIconToButton(facebookButton, 'https://supplishareblobstorage.blob.core.windows.net/static/assets/icon-facebook.png');
    } else {
        setTimeout(customizeSocialLoginButtons, retryInterval);
    }
}

function addIconToButton(button, imageUrl) {
    const buttonImage = document.createElement('img');
    buttonImage.src = imageUrl;
    button.prepend(buttonImage);
}

function customizeLoginForm() {
    const passwordField = document.querySelector('input[type="password"]');
    const retryInterval = 500;

    if (!passwordField) {
        setTimeout(customizeLoginForm, retryInterval);
        return;
    }

    addPasswordToggle(passwordField);
}

function addPasswordToggle(passwordField) {
    const togglePassword = document.createElement('img');
    togglePassword.src = 'https://supplishareblobstorage.blob.core.windows.net/static/assets/icon-hide.png';
    togglePassword.id = 'togglePassword';
    togglePassword.style.cursor = 'pointer';

    passwordField.parentNode.appendChild(togglePassword);
    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(passwordField, togglePassword);
    });
}

function togglePasswordVisibility(passwordField, toggleIcon) {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    toggleIcon.src = type === 'password' ? 'https://supplishareblobstorage.blob.core.windows.net/static/assets/icon-hide.png' : 'https://supplishareblobstorage.blob.core.windows.net/static/assets/icon-show.png';
}

function moveForgotPasswordLink() {
    const passwordField = document.getElementById('password');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    if (passwordField && forgotPasswordLink) {
        // Insert the forgot password link after the password field
        passwordField.parentNode.insertBefore(forgotPasswordLink, passwordField.nextSibling);
    }
}