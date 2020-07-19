document.addEventListener("DOMContentLoaded", () => {
  const validateURL = (value) => {
    const urlregex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return urlregex.test(value);
  };

  const testUrlValue = document.getElementById("url_value");
  const generateButton = document.getElementById("generate");
  const feedBack = document.getElementById("feedback");

  testUrlValue.addEventListener("keyup", () => {
    if (validateURL(testUrlValue.value)) {
      generateButton.disabled = false;
      feedBack.style.display = "none";
    } else if (testUrlValue.value === "") {
      generateButton.disabled = false;
      feedBack.style.display = "none";
    } else {
      generateButton.disabled = true;
      feedBack.style.display = "block";
    }
  });
});

const generate = () => {
  const url_value = document.getElementById("url_value").value;
  const token_value = document.getElementById("token_value").value;
  const params_1 = document.getElementById("params_1").value;
  const params_2 = document.getElementById("params_2").value;
  const params_3 = document.getElementById("params_3").value;

  let get_result = "";
  let get_result_axios = "";
  let post_result = "";
  let post_result_axios = "";
  let put_result = "";
  let put_result_axios = "";
  let delete_result = "";
  let delete_result_axios = "";

  if (url_value === "") {
    Swal.fire("Oopss..", `Please Fill In The Required Fields`, "error");
  } else {
    get_result += `
  const fetchData = () => {
    fetch("${url_value}", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "${token_value}"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => console.log(responseJSON))
      .catch((err) => console.error(err));
  };
  `;

    get_result_axios += `
  const fetchData = () => {
    axios.get("${url_value}",{
        headers: {
            authorization: "${token_value}"
        }
    }).then(response => {
            console.log(response);
      })
      .catch(err => console.error(err));
  };
  `;

    post_result += `
  const body = {
    params1: "${params_1}",
    params2: "${params_2}",
    params3: "${params_3}"
  }

  const createUser = (body) => {
    fetch("${url_value}", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "${token_value}"
      },
      method: "POST",
      body: JSON.stringify(body),
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJSON) => console.log(responseJSON))
    .catch((error) => console.log(error));
  };
  `;

    post_result_axios += `
  const body = {
    params1: "${params_1}",
    params2: "${params_2}",
    params3: "${params_3}"
  }
  const createUser = (body) => {
    axios.post('${url_value}', body ,{
            headers: {
                authorization: '${token_value}'
            }
        })
        .then((response) => console.log(response))
        .catch(error => console.error(error));
  };
  `;

    put_result += `
  const body = {
    params1: "${params_1}",
    params2: "${params_2}",
    params3: "${params_3}"
  }
  const updateUser = (body) => {
    fetch("${url_value}", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "${token_value}",
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
    .then((response) => console.log(response))
    .catch(error => console.error(error));
  };
  `;

    put_result_axios += `
  const body = {
    params1: "${params_1}",
    params2: "${params_2}",
    params3: "${params_3}"
  }
  const updateUser = (body) => {
    axios.put('${url_value}', body,{
            headers: {
                authorization: '${token_value}'
            }
        })
        .then(response => console.log(response))
        .catch(error => console.error(error));
  };
  `;

    delete_result += `
  const deleteUser = (${params_1}) => {
    fetch("${url_value}/${params_1}", {
      headers: {
        "X-Auth-Token": "${token_value}",
      },
      method: "DELETE",
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  };
  `;

    delete_result_axios += `
  const deleteUser = (${params_1}) => {
    axios.delete("${url_value}/${params_1}",{
            headers: {
                authorization: "${token_value}"
            }
        })
        .then(response => console.log(response))
        .catch(error => console.error(error));
  };
  `;

    document.querySelector("#result_get").innerHTML = get_result;
    document.querySelector("#clipboard_get").innerHTML = get_result;
    document.querySelector("#result_get_axios").innerHTML = get_result_axios;
    document.querySelector("#clipboard_get_axios").innerHTML = get_result_axios;
    document.querySelector("#result_post").innerHTML = post_result;
    document.querySelector("#clipboard_post").innerHTML = post_result;
    document.querySelector("#result_post_axios").innerHTML = post_result_axios;
    document.querySelector(
      "#clipboard_post_axios"
    ).innerHTML = post_result_axios;
    document.querySelector("#result_put").innerHTML = put_result;
    document.querySelector("#clipboard_put").innerHTML = put_result;
    document.querySelector("#result_put_axios").innerHTML = put_result_axios;
    document.querySelector("#clipboard_put_axios").innerHTML = put_result_axios;
    document.querySelector("#result_delete").innerHTML = delete_result;
    document.querySelector("#clipboard_delete").innerHTML = delete_result;
    document.querySelector(
      "#result_delete_axios"
    ).innerHTML = delete_result_axios;
    document.querySelector(
      "#clipboard_delete_axios"
    ).innerHTML = delete_result_axios;
  }
};

const copyClipboard = (method) => {
  let clipboard = document.querySelector(`#clipboard_${method}`);
  if (clipboard.textContent === "") {
    Swal.fire("Oopss..", `Please Fill In The Required Fields`, "error");
  } else {
    clipboard.select();
    document.execCommand("copy");
    Swal.fire(
      "Copy To Clipboard!",
      `${
        method.charAt(0).toUpperCase() + method.substr(1)
      } Copied Successfully`,
      "success"
    );
  }
};
