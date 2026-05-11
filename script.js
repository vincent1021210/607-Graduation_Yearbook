const classmates = [
  ["1號", "劉士弘"],
  ["2號", "郭哲瑜"],
  ["3號", "黃上恩"],
  ["4號", "邱思齊"],
  ["5號", "陳宥辰"],
  ["6號", "楊宇杰"],
  ["7號", "張軒凱"],
  ["8號", "邱德榮"],
  ["9號", "張久軒"],
  ["10號", "蘇昱誠"],
  ["11號", "秦紹軒"],
  ["12號", "陳庭豪"],
  ["13號", "蔡博任"],
  ["14號", "張祐實"],
  ["15號", "廖品筑"],
  ["16號", "李垣萱"],
  ["17號", "姚宥寧"],
  ["18號", "錢瑋婕"],
  ["19號", "陳亞歆"],
  ["20號", "許為婷"],
  ["21號", "連曼晴"],
  ["22號", "諶顥云"],
  ["23號", "賴暐璇"],
  ["24號", "林詠淇"],
  ["25號", "陳宥瑄"],
  ["27號", "張恩僑"]
];

const colors = ["#2f6f9f", "#e56b5d", "#2f8f83", "#7aa95c", "#9b6b43", "#6d5fa8"];

const rotatingPhotos = [
  "IMG_1024.JPG",
  "IMG_1025.JPG",
  "IMG_1026.JPG",
  "IMG_1027.JPG",
  "IMG_1028.JPG",
  "IMG_1029.JPG",
  "IMG_1082.JPG",
  "IMG_1083.JPG",
  "IMG_1084.JPG",
  "IMG_1085.JPG",
  "IMG_1086.JPG",
  "IMG_1087.JPG",
  "IMG_1120.JPG",
  "IMG_1121.JPG",
  "IMG_1122.JPG",
  "IMG_1124.JPG",
  "IMG_1125.JPG",
  "IMG_1126.JPG",
  "IMG_1127.JPG",
  "IMG_1128.JPG",
  "IMG_1129.JPG",
  "IMG_1130.JPG",
  "IMG_1135.JPG",
  "IMG_1136.JPG",
  "IMG_1137.JPG",
  "IMG_1138.JPG",
  "IMG_1139.JPG",
  "IMG_1140.JPG",
  "IMG_1141.JPG",
  "IMG_1142.JPG",
  "IMG_1143.JPG",
  "IMG_1144.JPG",
  "IMG_1145.JPG",
  "IMG_1146.JPG",
  "IMG_1147.JPG",
  "IMG_1148.JPG",
  "IMG_1149.JPG",
  "IMG_1150.JPG",
  "IMG_1177.JPG",
  "IMG_1178.JPG",
  "IMG_1179.JPG",
  "IMG_1180.JPG",
  "IMG_1181.JPG",
  "IMG_1182.JPG",
  "IMG_1183.JPG",
  "IMG_1184.JPG",
  "IMG_1185.JPG",
  "IMG_1186.JPG",
  "IMG_1187.JPG",
  "IMG_1188.JPG",
  "IMG_1189.JPG",
  "IMG_1190.JPG",
  "IMG_1191.JPG",
  "IMG_1192.JPG",
  "IMG_1193.JPG",
  "IMG_1194.JPG",
  "IMG_1195.JPG",
  "IMG_1196.JPG",
  "IMG_1197.JPG",
  "IMG_1198.JPG",
  "IMG_1199.JPG",
  "IMG_1200.JPG",
  "IMG_1201.JPG",
  "IMG_1202.JPG",
  "IMG_1203.JPG",
  "IMG_1204.JPG",
  "IMG_1205.JPG",
  "IMG_1206.JPG",
  "IMG_1207.JPG",
  "IMG_1208.JPG",
  "IMG_1209.JPG",
  "IMG_1210.JPG",
  "IMG_1211.JPG",
  "IMG_1212.JPG",
  "IMG_1213.JPG",
  "IMG_2028.JPG",
  "IMG_2029.JPG",
  "IMG_2030.JPG",
  "IMG_2031.JPG",
  "IMG_2032.JPG"
].map((name) => `assets/photos/random/${name}`);

const classGrid = document.querySelector("#classGrid");

classmates.forEach(([number, name], index) => {
  const card = document.createElement("article");
  card.className = "student-card";
  card.style.setProperty("--card-color", colors[index % colors.length]);
  card.innerHTML = `
    <div class="student-photo" aria-hidden="true">${name.slice(0, 1)}</div>
    <h3>${name}</h3>
    <p>${number}</p>
  `;
  classGrid.appendChild(card);
});

const photoSlots = [
  document.querySelector(".photo-stack-a"),
  document.querySelector(".photo-stack-b"),
  document.querySelector(".photo-stack-c"),
  document.querySelector(".sports-day"),
  document.querySelector(".classroom"),
  document.querySelector(".trip")
].filter(Boolean);

let recentPhotos = [];

function pickPhoto(usedThisRound) {
  const availablePhotos = rotatingPhotos.filter(
    (photo) => !usedThisRound.has(photo) && !recentPhotos.includes(photo)
  );
  const pool = availablePhotos.length > 0 ? availablePhotos : rotatingPhotos.filter((photo) => !usedThisRound.has(photo));
  return pool[Math.floor(Math.random() * pool.length)];
}

function rotatePhotos() {
  const usedThisRound = new Set();

  photoSlots.forEach((slot) => {
    const photo = pickPhoto(usedThisRound);
    usedThisRound.add(photo);
    slot.classList.add("is-changing");

    window.setTimeout(() => {
      slot.style.backgroundImage = `url("${photo}")`;
      slot.classList.remove("is-changing");
    }, 220);
  });

  recentPhotos = [...usedThisRound, ...recentPhotos].slice(0, 18);
}

rotatePhotos();
window.setTimeout(rotatePhotos, 1200);
window.setInterval(rotatePhotos, 500000);

const MESSAGE_API_URL = "https://script.google.com/macros/s/AKfycbzVtmC91Bb8PbgQDnRN7x7cnI8iiOPwhlhZ6g262BIKn1ggl6lpYmwFCFPztnr7l38gCw/exec";
const starterMessages = [
  ["導師", "願你們帶著好奇心出發，走到哪裡都記得自己很珍貴。"],
  ["全班", "畢業快樂，下一站也要閃閃發光。"]
];

const writeMessageButton = document.querySelector("#writeMessageButton");
const messageForm = document.querySelector("#messageForm");
const messageList = document.querySelector("#messageList");
const messageStatus = document.querySelector("#messageStatus");
const messageSubmitButton = document.querySelector("#messageSubmitButton");

function addMessage(name, text) {
  const note = document.createElement("article");
  note.className = "message-note";
  note.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
  messageList.prepend(note);
}

starterMessages.forEach(([name, text]) => addMessage(name, text));

writeMessageButton.addEventListener("click", () => {
  messageForm.classList.toggle("is-hidden");

  if (!messageForm.classList.contains("is-hidden")) {
    document.querySelector("#messageName").focus();
  }
});

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#messageName");
  const textInput = document.querySelector("#messageText");
  const name = nameInput.value.trim() || "匿名同學";
  const message = textInput.value.trim();

  if (!message) {
    messageStatus.textContent = "請先寫下留言內容。";
    textInput.focus();
    return;
  }

  messageSubmitButton.disabled = true;
  messageSubmitButton.textContent = "送出中...";
  messageStatus.textContent = "正在把留言寫進 Google Sheet。";

  try {
    await fetch(MESSAGE_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ name, message })
    });

    addMessage(name, message);
    messageForm.reset();
    messageForm.classList.add("is-hidden");
    messageStatus.textContent = "";
  } catch (error) {
    messageStatus.textContent = "送出失敗，請稍後再試。";
  } finally {
    messageSubmitButton.disabled = false;
    messageSubmitButton.textContent = "送出留言";
  }
});
