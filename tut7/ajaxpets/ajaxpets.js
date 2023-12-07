/**
 * A webpage for fetching cute pet photos.
 * Photos will be populated on the page after the user
 * selects their desired pet type.
 */
"use strict";
(function () {
  window.addEventListener("load", init);

  /**
   * TODO: What do we need to initialize?
   */
  const url = "https://hanustartup.org/wpr/api/pets/index.php";
  function init() {
    // TODO
    const btns = qsa("label input[type=radio");
    const picture = id("pictures");
    btns.forEach((btn) => {
      btn.addEventListener("change", async (e) => {
        const animal = e.target.value;
        picture.innerHTML = await rederImg(animal);
      });
    });
  }
  async function rederImg(animal) {
    const response = await makeRequest(animal);
    if (response.status === 200) {
      const imgUrls = await response.text();
      const imgElement = imgUrls.split("\n").reduce((html, imgUrl) => {
        return html + `<img src="${imgUrl}"/>`;
      }, "");

      return imgElement;
    } else {
      return `Error: ${response.status}`;
    }
  }
  /**
   * TODO: Fetch data from the ajax pets API!
   */
  async function makeRequest(animal) {
    // TODO
    const response = await fetch(url + `?animal=${animal}`);
    return response;
  }

  /**
   * TODO: Implement any other functions you need
   */

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
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
