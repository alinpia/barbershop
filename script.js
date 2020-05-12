var hasLocalStorage = (function() {
	try {
		localStorage.setItem('test', 'test');
		localStorage.removeItem('test');
		return true;
	} catch (e) {
		return false;
	}
}());

function setListeners() {
    const loginLink = document.querySelector('.login-link');
    loginLink.addEventListener('click', loginLinkListener);

    const closeLoginModalBtn = document.querySelector('.modal-login .modal-close');
    closeLoginModalBtn.addEventListener('click', closeLoginButtonListener);

    const submitLoginBtn = document.querySelector('.modal-login button[type="submit"]');
    submitLoginBtn.addEventListener('click', handleLoginSubmit);

    const mapLink = document.querySelector('.footer-contacts a');
    mapLink.addEventListener('click', mapLinkListener);

    const closeMapModalBtn = document.querySelector('.modal-map .modal-close');
    closeMapModalBtn.addEventListener('click', closeModalMapListener);

    window.addEventListener('keydown', processKeyEvent);
}

function handleLoginSubmit(e) {
    const login = document.querySelector('#user-login');
    const password = document.querySelector('#user-password');
    const modalLogin = document.querySelector('.modal-login');

    modalLogin.classList.remove('modal-error');

    if (!(login.value && password.value)) {
        e.preventDefault;
        modalLogin.width = modalLogin.offsetWidth;
        return modalLogin.classList.add('modal-error');
    }

    if (hasLocalStorage && getRememberLoginState()) {
        setLocalStorageItem('login', login.value);
    }
}

function getRememberLoginState() {
    return document.querySelector('#remember-user') &&
        document.querySelector('#remember-user').checked;
}

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorageItem(key) {
    return localStorage.getItem(key);
}

function toggleLoginModal(flag) {
    const loginModal = document.querySelector('.modal-login');

    if (flag) {
        openModal(loginModal);
        setLoginInputFocus();
        return tryRestoreLogin();
    }

    loginModal.classList.remove('modal-error');
    return closeModal(loginModal);
}

function tryRestoreLogin() {
    const loginInput = document.querySelector('#user-login');
    let login = '';

    login = hasLocalStorage && getLocalStorageItem('login');

    if (login) {
        loginInput.value = login;
        const passwordInput = document.querySelector('#user-password');
        passwordInput.focus();
    }
}

function toggleMapModal(flag) {
    const mapModal = document.querySelector('.modal-map');

    if (flag) {
        return openModal(mapModal);
    }

    return closeModal(mapModal);
}

function setLoginInputFocus() {
    const loginInput = document.querySelector('#user-login');
    loginInput.focus();
}

function openModal(modal) {
    modal.classList.add('modal-show');
}

function closeModal(modal) {
    modal.classList.remove('modal-show');
}

function processKeyEvent(e) {
    const key = 'Escape';
    const deprecatedKeyCode = 27;
    let isEscape = false;

    if (e.key && (e.key === key)) {
        isEscape = true;
    } else {
        isEscape = !!(e.keyCode && (e.keyCode === deprecatedKeyCode)); 
    }

    isEscape && processEscape(e);
}

function processEscape(e) {
    const openedModal = document.querySelector('.modal.modal-show');

    if (openedModal) {
        e.preventDefault();
        openedModal.classList.remove('modal-error');
        closeModal(openedModal);
    }
}

function loginLinkListener(e) {
    e.preventDefault();

    toggleLoginModal(true);
}

function closeLoginButtonListener() {
    toggleLoginModal(false);
}

function mapLinkListener(e) {
    e.preventDefault();

    toggleMapModal(true);
}

function closeModalMapListener() {
    toggleMapModal(false);
}

setListeners();