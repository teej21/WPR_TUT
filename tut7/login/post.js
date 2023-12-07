/*
 * Sending POST request with fetch
 */
"use strict";
(function () {
  const API_URL = " https://hanustartup.org/wpr/api/login.php";

  window.addEventListener("load", init);

  /**
   * TODO - setup the sign-in button on initial page load
   */
  function init() {
    // TODO
    const signInBtn = id("sign-in");
    const signInResult = id("response");
    const usernameInput = id("username");
    const passwordInput = id("password");
    signInBtn.onclick = async (e) => {
      e.preventDefault();

      const username = usernameInput.value;
      const password = passwordInput.value;
      const response = await signIn(username, password);
      if (response.status === 200 || response.ok) {
        const result = await response.text();

        signInResult.innerHTML = result;
      } else {
        signInResult = `error: ${response.status}`;
      }
    };
  }

  /**
   * TODO
   * signIn - Signs the user in based on username and password inputs
   */
  async function signIn(username, password) {
    //TODO
    const data = new FormData();
    data.append("user", username);
    data.append("password", password);
    const response = await fetch(API_URL, {
      method: "POST",
      body: data,
    });
    return response;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
