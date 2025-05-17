import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3.11.0/+esm';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBssXIoX117ztXiHq7VXEjh0En14sphvhc",
    authDomain: "liga-feminina-ti.firebaseapp.com",
    projectId: "liga-feminina-ti",
    storageBucket: "liga-feminina-ti.firebasestorage.app",
    messagingSenderId: "389659251811",
    appId: "1:389659251811:web:910af0a37beaee7d4cd456",
    measurementId: "G-RMY041SX72"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializa EmailJS
emailjs.init('B4REthHplK_wi7bzv');

// Elementos do formulário
const form = document.getElementById('emailForm');
const input = document.getElementById('emailInput');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = input.value.trim();

    // Validação básica de e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mensagem.textContent = "Por favor, digite um e-mail válido.";
        mensagem.style.color = "red";
        return;
    }

    try {
        // Verifica se email já existe
        const emailsRef = collection(db, "emails");
        const q = query(emailsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            mensagem.textContent = "Este e-mail já está cadastrado.";
            mensagem.style.color = "orange";
            return;
        }

        // Salva no Firestore
        await addDoc(collection(db, "emails"), {
            email: email,
            dataCadastro: new Date()
        });

        // Envia e-mail via EmailJS
        await emailjs.send("service_e18qy6i", "template_f0c3c7d", {
            email: email,
            message: "Seu e-mail foi cadastrado com sucesso! Agora você não vai perder nenhuma das nossas novidades.",
            time: new Date().toLocaleString()
        });

        mensagem.textContent = "E-mail cadastrado com sucesso!";
        mensagem.style.color = "green";
        form.reset();
    } catch (erro) {
        console.error("Erro ao salvar ou enviar e-mail:", erro);
        mensagem.textContent = "Erro ao cadastrar. Tente novamente.";
        mensagem.style.color = "red";
    }
});
