const loginArea = document.getElementById("loginArea");
const loginField = document.getElementById("inputLoginPassword");
const loginText = document.getElementById("loginText");
const loginTrustedSwitch = document.getElementById("loginTrustedSwitch");
const loginButton = document.getElementById("loginButton");

const addOfferButton = document.getElementById("addOfferButton");
const contentTable = document.getElementById("contentTable");

const alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
const alertModalContent = document.getElementById("alertModalContent");
const alertModalLabel = document.getElementById("alertModalLabel");

const offerFormActiveContainer = document.getElementById(
  "offerFormActiveContainer"
);
const offerFormActiveSwitch = document.getElementById("offerFormActiveSwitch");
const offerFormActiveLabel = document.getElementById("offerFormActiveLabel");
const offerFormRemoveButton = document.getElementById("offerFormRemoveButton");
const offerFormBackButton = document.getElementById("offerFormBackButton");
const offerFormSaveButton = document.getElementById("offerFormSaveButton");

const offerFormStore = document.getElementById("offerFormStore");
const offerFormStoreInput = document.getElementById("offerFormStoreInput");
const offerFormDescription = document.getElementById("offerFormDescription");
const offerFormLink = document.getElementById("offerFormLink");
const offerFormContent = document.getElementById("offerFormContent");
const offerFormCreation = document.getElementById("offerFormCreation");
const offerFormUtilization = document.getElementById("offerFormUtilization");
const screenContainer = document.getElementById("screenContainer");

const urlDomain = "http://localhost:3000";

const checkedColumns = {
  id: false,
  active: false,
  store: true,
  description: true,
  link: false,
  content: false,
  creation: false,
  utilization: true,
  uses: false,
};

let resultContent = [];
let apiKey;
let apiKeyStored = false;
let selectedOffer;
let storeList = [];
let removingOffer = 0;

window.addEventListener("load", () => {
  startup();
});

function startup() {
  offerFormActiveSwitch.addEventListener("change", changeActiveOffer);

  loginButton.addEventListener("click", submitApiKey);
  loginField.addEventListener("keyup", submitApiKey);
  document
    .getElementById("alertModal")
    .addEventListener("shown.bs.modal", function () {
      offerFormBackButton.focus();
    });
  addOfferButton.addEventListener("click", showOfferForm);
  offerFormSaveButton.addEventListener("click", saveOffer);
  offerFormRemoveButton.addEventListener("click", removeOffer);

  apiKey = localStorage.getItem("APIKEY");

  if (apiKey) {
    apiKeyStored = true;
    populateTable();
  } else {
    showLogin(true);
  }
}

function removePassword() {
  localStorage.removeItem("APIKEY");
  apiKeyStored = false;
  window.location.reload();
}

function changeActiveOffer(e) {
  if (e.target.checked) {
    offerFormActiveLabel.className = offerFormActiveLabel.className.replace(
      "text-secondary",
      "text-black"
    );
    offerFormRemoveButton.disabled = true;
    offerFormStoreInput.disabled = false;
    offerFormDescription.disabled = false;
    offerFormContent.disabled = false;
    offerFormLink.disabled = false;
    selectedOffer.active = true;
  } else {
    offerFormActiveLabel.className = offerFormActiveLabel.className.replace(
      "text-black",
      "text-secondary"
    );
    offerFormRemoveButton.disabled = false;
    offerFormStoreInput.disabled = true;
    offerFormDescription.disabled = true;
    offerFormContent.disabled = true;
    offerFormLink.disabled = true;
    selectedOffer.active = false;
  }
}

function showLogin(show) {
  if (show) {
    loginArea.className = loginArea.className.replace("d-none", "d-flex");
    screenContainer.className = screenContainer.className.replace(
      "visible",
      "visually-hidden"
    );
    loginField.focus();
  } else {
    loginArea.className = loginArea.className.replace("d-flex", "d-none");
    screenContainer.className = screenContainer.className.replace(
      "visually-hidden",
      "visible"
    );
  }
}

function submitApiKey(e) {
  if (
    (e && e.key && (e.key == "Enter" || e.keyCode == 13) && loginField.value) ||
    e.target.id == "loginButton"
  ) {
    apiKey = loginField.value;
    if (loginTrustedSwitch.checked) {
      localStorage.setItem("APIKEY", `${apiKey}`);
      apiKeyStored = true;
    } else {
    }
    populateTable();
  }
}

function setCheckedColumns() {
  if ($("input[type=checkbox][data-field=id]")[0].checked) {
    checkedColumns.id = true;
  } else {
    checkedColumns.id = false;
  }
  if ($("input[type=checkbox][data-field=active]")[0].checked) {
    checkedColumns.active = true;
  } else {
    checkedColumns.active = false;
  }
  if ($("input[type=checkbox][data-field=store]")[0].checked) {
    checkedColumns.store = true;
  } else {
    checkedColumns.store = false;
  }
  if ($("input[type=checkbox][data-field=description]")[0].checked) {
    checkedColumns.description = true;
  } else {
    checkedColumns.description = false;
  }
  if ($("input[type=checkbox][data-field=link]")[0].checked) {
    checkedColumns.link = true;
  } else {
    checkedColumns.link = false;
  }
  if ($("input[type=checkbox][data-field=content]")[0].checked) {
    checkedColumns.content = true;
  } else {
    checkedColumns.content = false;
  }
  if ($("input[type=checkbox][data-field=creation]")[0].checked) {
    checkedColumns.creation = true;
  } else {
    checkedColumns.creation = false;
  }
  if ($("input[type=checkbox][data-field=utilization]")[0].checked) {
    checkedColumns.utilization = true;
  } else {
    checkedColumns.utilization = false;
  }
  if ($("input[type=checkbox][data-field=uses]")[0].checked) {
    checkedColumns.uses = true;
  } else {
    checkedColumns.uses = false;
  }
  fixFooter();
}

function populateTable() {
  if (!apiKey) {
    showLogin(true);
    return;
  }

  let route = checkedColumns.active ? "listall" : "listactive";

  fetch(`${urlDomain}/${route}?apiKey=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length > 0 && data[0] == "password") {
        loginText.innerHTML = "Senha inválida!";
        loginField.value = "";
        return false;
      } else {
        loginText.innerHTML = "Carregando página...";
        resultContent = data;
        createContentTable();
        populateStoreList();

        $(".toggle-all").on("click", () => {
          if (!$(".toggle-all").prop("checked")) {
            $("input[type=checkbox][data-field=store]")[0].click();
            $("input[type=checkbox][data-field=description]")[0].click();
            $("input[type=checkbox][data-field=utilization]")[0].click();
            $("input[type=checkbox][data-field=id]")[0].click();
          }
          fixFooter();
        });

        $("input[type=checkbox][data-field=active]").on("click", () => {
          if ($("input[type=checkbox][data-field=active]")[0].checked) {
            checkedColumns.active = true;
          } else {
            checkedColumns.active = false;
          }
          populateTable();
        });

        $("input[type=checkbox][data-field=id]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=store]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=description]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=link]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=content]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=creation]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=utilization]").on("click", () => {
          setCheckedColumns();
        });
        $("input[type=checkbox][data-field=uses]").on("click", () => {
          setCheckedColumns();
        });

        $("#contentTable").on("check.bs.table", function (e) {
          $("#contentTable").bootstrapTable("load", resultContent);
        });

        $("#contentTable").on("refresh.bs.table", function (e) {
          checkedColumns.id =
            checkedColumns.active =
            checkedColumns.link =
            checkedColumns.content =
            checkedColumns.creation =
            checkedColumns.uses =
            false;
          checkedColumns.store =
            checkedColumns.description =
            checkedColumns.utilization =
            true;
          populateTable();
        });

        $("#contentTable").on("toggle.bs.table", function (e) {
          fixFooter();
        });

        $('span:contains("Toggle all")').text("Todas");

        // set logout button
        $("button[name=clearSearch]").children()[0].remove();
        $("button[name=clearSearch]").append(
          '<i class="fa font-weight-bold font-monospace">SAIR</i>'
        );
        $("button[name=clearSearch]").removeClass('btn-secondary');
        $("button[name=clearSearch]").addClass('btn-outline-secondary');
        if (!$("button[name=clearSearch]").hasClass("opacity-75")) {
          $("button[name=clearSearch]").addClass("opacity-75");
        }
        if (apiKeyStored) {
          $("button[name=clearSearch]").removeClass("visually-hidden");
          $("button[name=clearSearch]").addClass("visible");
        } else {
          $("button[name=clearSearch]").removeClass("visible");
          $("button[name=clearSearch]").addClass("visually-hidden");
        }
        $("button[name=clearSearch]").on("click", removePassword);

        showLogin(false);
        return true;
      }
    })
    .catch(function (err) {
      console.log("Something went wrong!", err);
    });
}

function populateStoreList() {
  if (resultContent.length > 0) {
    for (const offer of resultContent) {
      if (storeList.indexOf(offer.store) == -1) {
        if (offer.store == null) {
          storeList.push("");
        } else {
          storeList.push(offer.store);
        }
      }
    }
  }
}

function showOfferForm(offer) {
  if (window.screen.height < 800) {
    offerFormDescription.rows = "1";
    offerFormContent.rows = "9";
    offerFormBackButton.className = offerFormBackButton.className.replace(
      "mx-2",
      "mx-1"
    );
    offerFormSaveButton.className = offerFormSaveButton.className.replace(
      "ml-2",
      "mx-1"
    );
  } else {
    offerFormDescription.rows = "2";
    offerFormContent.rows = "10";
    offerFormBackButton.className = offerFormBackButton.className.replace(
      "m-1",
      "mx-2"
    );
    offerFormSaveButton.className = offerFormSaveButton.className.replace(
      "mx-1",
      "mx-2"
    );
  }

  if (
    window.screen.orientation.type == "portrait-primary" ||
    $(document).width() / $(document).height() <= 1.5
  ) {
    offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
      "w-50",
      "w-100"
    );
  } else {
    offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
      "w-100",
      "w-50"
    );
  }

  if ($(window).width() / $(window).height() > 2.1) {
    offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
      "mr-0",
      "mr-1"
    );
    if (
      window.screen.orientation.type == "landscape-primary" &&
      window.screen.width < 1280
    ) {
      offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
        "w-50",
        "w-100"
      );
    }
  }

  offerFormStore.innerHTML = null;
  for (const store of storeList) {
    const newOption = document.createElement("option");
    newOption.value = store;
    offerFormStore.appendChild(newOption);
  }

  // editing
  if (offer.id) {
    selectedOffer = offer;
    alertModalLabel.innerHTML = "Editar Promoção";
    alertModalLabel.className = alertModalLabel.className.replace(
      "text-primary",
      "text-danger"
    );

    offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
      "visually-hidden",
      "visible"
    );
    offerFormActiveContainer.className =
      offerFormActiveContainer.className.replace("visually-hidden", "visible");

    if (selectedOffer.active) {
      offerFormActiveSwitch.checked = true;
    } else {
      offerFormActiveSwitch.checked = false;
    }

    offerFormStoreInput.value = selectedOffer.store;
    offerFormDescription.value = selectedOffer.description;
    offerFormLink.value = selectedOffer.link;
    offerFormContent.value = selectedOffer.content;
    offerFormCreation.value = selectedOffer.creation.replace(" ", "T");
    offerFormUtilization.value = selectedOffer.utilization.replace(" ", "T");

    // new
  } else {
    selectedOffer = new Offer();
    selectedOffer.active = true;
    selectedOffer.uses = 1;
    alertModalLabel.innerHTML = "Nova Promoção";
    alertModalLabel.className = alertModalLabel.className.replace(
      "text-danger",
      "text-primary"
    );

    offerFormRemoveButton.className = offerFormRemoveButton.className.replace(
      "visible",
      "visually-hidden"
    );
    offerFormActiveContainer.className =
      offerFormActiveContainer.className.replace("visible", "visually-hidden");

    offerFormStoreInput.value = null;
    offerFormDescription.value = null;
    offerFormLink.value = null;
    offerFormContent.value = null;
    offerFormActiveSwitch.checked = true;
    let today = new Date();
    selectedOffer.creation = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")} ${today
        .getHours()
        .toString()
        .padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`;
    selectedOffer.utilization = selectedOffer.creation;
    offerFormCreation.value = selectedOffer.creation.replace(" ", "T");
    offerFormUtilization.value = selectedOffer.utilization.replace(" ", "T");
  }

  if (offerFormActiveSwitch.checked) {
    offerFormRemoveButton.disabled = true;
    offerFormStoreInput.disabled = false;
    offerFormDescription.disabled = false;
    offerFormContent.disabled = false;
    offerFormLink.disabled = false;
  } else {
    offerFormRemoveButton.disabled = false;
    offerFormStoreInput.disabled = true;
    offerFormDescription.disabled = true;
    offerFormContent.disabled = true;
    offerFormLink.disabled = true;
  }

  alertModal.show();
  document
    .getElementById("alertModal")
    .addEventListener("hidden.bs.modal", function handler() {
      this.removeEventListener("hidden.bs.modal", handler);
    });
}

function saveOffer() {
  if (offerFormActiveSwitch.checked) {
    selectedOffer.active = 1;
    if (offerFormStoreInput.value == "") {
      selectedOffer.store = null;
    } else {
      selectedOffer.store = offerFormStoreInput.value;
    }
    if (offerFormDescription.value == "") {
      selectedOffer.description = null;
    } else {
      selectedOffer.description = offerFormDescription.value;
    }
    if (offerFormLink.value == "") {
      selectedOffer.link = null;
    } else {
      selectedOffer.link = offerFormLink.value;
    }
    if (offerFormContent.value == "") {
      selectedOffer.content = null;
    } else {
      selectedOffer.content = offerFormContent.value;
    }
    selectedOffer.creation = offerFormCreation.value.replace("T", " ");

    // set today's date
    let today = new Date();
    selectedOffer.utilization = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")} ${today
        .getHours()
        .toString()
        .padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`;
    offerFormUtilization.value = selectedOffer.utilization.replace(" ", "T");
    selectedOffer.uses++;

    navigator.clipboard.writeText(offerFormContent.value);

    // set inactive
  } else {
    selectedOffer.active = 0;
    selectedOffer.utilization = offerFormUtilization.value.replace("T", " ");
  }

  let defaultHeader = new Headers();
  defaultHeader.append("Content-Type", "application/json");
  let requestJSON = JSON.stringify(selectedOffer);
  let requestOptions = {
    method: "POST",
    headers: defaultHeader,
    body: requestJSON,
    redirect: "follow",
  };

  let query;
  if (selectedOffer.id) {
    requestOptions.method = "PUT";
    query = "update";
  } else {
    query = "add";
  }

  fetch(`${urlDomain}/${query}?apiKey=${apiKey}`, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      populateTable();
      return true;
    })
    .catch(function (err) {
      console.log("Something went wrong!", err);
    });
}

function removeOffer() {
  if (!offerFormActiveSwitch.checked) {
    let defaultHeader = new Headers();
    defaultHeader.append("Content-Type", "application/json");
    let requestJSON = JSON.stringify(selectedOffer);
    let requestOptions = {
      method: "DELETE",
      headers: defaultHeader,
      body: requestJSON,
      redirect: "follow",
    };

    fetch(`${urlDomain}/delete?apiKey=${apiKey}`, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        populateTable();
        return true;
      })
      .catch(function (err) {
        console.log("Something went wrong!", err);
      });
  }
}

function formatOfferToSave(offer) {
  if (offer.active == "Ativa") {
    offer.active = 1;
  } else {
    offer.active = 0;
  }
  return offer;
}

//#region table creation

function createContentTable() {
  let tableHeight = "";
  if (resultContent.length > 10) {
    tableHeight = window.innerHeight * 0.95;
  }

  $("#contentTable")
    .bootstrapTable("destroy")
    .bootstrapTable({
      locale: "pt-BR",
      toolbar: "#toolbar",
      pagination: true,
      pageList: "[10, 100, 1000, all]",
      pageSize: 100,
      formatClearSearch: function () {
        return "Remove a senha salva e volta para a tela inicial";
      },
      formatRefresh: function () {
        return "Recarrega na visualização padrão";
      },
      formatToggleOn: function () {
        return "Visualização de cartão";
      },
      formatToggleOff: function () {
        return "Visualização de cartão";
      },
      formatColumns: function () {
        return "Define as colunas visíveis";
      },
      formatAllRows: function () {
        return "Todos";
      },
      formatShowingRows: function (pageFrom, pageTo, totalRows) {
        return `Mostrando ${pageFrom} a ${pageTo} de ${totalRows} registros`;
      },
      formatRecordsPerPage: function (pageNumber) {
        return `${pageNumber} registros por página`;
      },
      formatNoMatches: function (pageNumber) {
        return `Nenhum resultado`;
      },
      searchAccentNeutralise: true,
      searchHighlight: true,
      headerStyle: "headerStyle",
      showColumns: true,
      filterControl: true,
      disableUnusedSelectOptions: true,
      searchOnEnterKey: true,
      reorderableColumns: true,
      detailViewIcon: false,
      detailViewByClick: true,
      sortName: "utilization",
      sortOrder: "asc",
      showCopyRows: true,
      editable: true,
      clickToSelect: true,
      detailFormatter: "detailFormatter",
      showToggle: true,
      showColumnsToggleAll: true,
      showRefresh: true,
      showSearchClearButton: true,
      height: tableHeight,
      classes: "table table-hover table-bordered table-striped ",
      columns: [
        {
          field: "id",
          title: "Id",
          width: 10,
          align: "center",
          sortable: "true",
          filterControl: "input",
          switchable: true,
          visible: checkedColumns.id,
        },
        {
          field: "active",
          title: "Status",
          width: 10,
          align: "left",
          sortable: "true",
          formatter: "statusFormatter",
          filterControl: "select",
          filterStrictSearch: true,
          visible: checkedColumns.active,
        },
        {
          field: "store",
          title: "Loja",
          width: 100,
          align: "left",
          sortable: "true",
          filterControl: "select",
          filterStrictSearch: true,
          switchable: true,
          disableUnusedSelectOptions: true,
          visible: checkedColumns.store,
        },
        {
          field: "description",
          title: "Descrição",
          width: 300,
          align: "left",
          sortable: "true",
          filterControl: "input",
          switchable: true,
          visible: checkedColumns.description,
        },
        {
          field: "link",
          title: "Link",
          width: 100,
          align: "left",
          sortable: "true",
          filterControl: "input",
          visible: checkedColumns.link,
        },
        {
          field: "content",
          title: "Texto",
          width: 300,
          align: "left",
          sortable: "true",
          filterControl: "input",
          visible: checkedColumns.content,
        },
        {
          field: "creation",
          title: "Criação",
          width: 10,
          align: "center",
          sortable: "true",
          sorter: "dateSorter",
          filterControl: "input",
          visible: checkedColumns.creation,
        },
        {
          field: "utilization",
          title: "Utilização",
          width: 10,
          align: "center",
          sortable: "true",
          sorter: "dateSorter",
          filterControl: "input",
          switchable: true,
          visible: checkedColumns.utilization,
        },
        {
          field: "uses",
          title: "Alterações",
          width: 10,
          align: "center",
          sortable: "true",
          filterControl: "input",
          visible: checkedColumns.uses,
        },
      ],
      data: resultContent,
    });
  fixFooter();
}

function dateSorter(a, b) {
  if (
    new Date(
      `${a.substring(6, 10)}-${a.substring(3, 5)}-${a.substring(
        0,
        2
      )} ${a.substring(11, 13)}:${a.substring(14, 16)}`
    ) >
    new Date(
      `${b.substring(6, 10)}-${b.substring(3, 5)}-${b.substring(
        0,
        2
      )} ${b.substring(11, 13)}:${b.substring(14, 16)}`
    )
  )
    return 1;
  if (
    new Date(
      `${a.substring(6, 10)}-${a.substring(3, 5)}-${a.substring(
        0,
        2
      )} ${a.substring(11, 13)}:${a.substring(14, 16)}`
    ) <
    new Date(
      `${b.substring(6, 10)}-${b.substring(3, 5)}-${b.substring(
        0,
        2
      )} ${b.substring(11, 13)}:${b.substring(14, 16)}`
    )
  )
    return -1;
  return 0;
}

function statusFormatter(data) {
  if (data == 1) {
    return "Ativa";
  } else {
    return "Inativa";
  }
}

function detailFormatter(index, row) {
  let editingOffer = new Offer();
  editingOffer.id = row.id;
  editingOffer.active = row.active;
  editingOffer.store = row.store;
  editingOffer.description = row.description;
  editingOffer.content = row.content;
  editingOffer.creation = `${row.creation.substring(
    6,
    10
  )}-${row.creation.substring(3, 5)}-${row.creation.substring(
    0,
    2
  )} ${row.creation.substring(11, 13)}:${row.creation.substring(14, 16)}`;
  editingOffer.utilization = `${row.utilization.substring(
    6,
    10
  )}-${row.utilization.substring(3, 5)}-${row.utilization.substring(
    0,
    2
  )} ${row.utilization.substring(11, 13)}:${row.utilization.substring(14, 16)}`;
  editingOffer.uses = row.uses;
  editingOffer.link = row.link;
  showOfferForm(editingOffer);
}

function headerStyle(column) {
  return {
    id: {
      css: { background: "azure", "font-size": "large" },
    },
    active: {
      css: { background: "azure", "font-size": "large" },
    },
    store: {
      css: { background: "azure", "font-size": "large" },
    },
    description: {
      css: { background: "azure", "font-size": "large" },
    },
    link: {
      css: { background: "azure", "font-size": "large" },
    },
    content: {
      css: { background: "azure", "font-size": "large" },
    },
    creation: {
      css: { background: "azure", "font-size": "large" },
    },
    utilization: {
      css: { background: "azure", "font-size": "large" },
    },
    uses: {
      css: { background: "azure", "font-size": "large" },
    },
  }[column.field];
}

//#endregion

// simple hack to fix bootstrap-table footer positioning issue when generating table
function fixFooter() {
  setTimeout(() => {
    let buttons = document.getElementsByClassName("dropdown-menu");
    let dropButton;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("dropdown-menu")) {
        dropButton = buttons[i];
      }
    }
    let dropButtonOptions = dropButton.children;
    for (var i = 0; i < dropButtonOptions.length; i++) {
      if (dropButtonOptions[i].classList.contains("active")) {
        dropButtonOptions[i].click();
      }
    }
  }, 100);
}

// object function to use as a model to CRUD offers
function Offer() {
  this.id,
    this.active,
    this.store,
    this.description,
    this.link,
    this.content,
    this.creation,
    this.utilization,
    this.uses;
}
