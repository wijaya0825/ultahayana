    function createBalloon() {
        const b = document.createElement('div');
        b.classList.add('balloon');
        const colors = ['#ff85a2', '#ffdb58', '#9be3de', '#b4e197'];
        b.style.background = colors[Math.floor(Math.random() * colors.length)];
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.getElementById('balloons').appendChild(b);
        setTimeout(() => b.remove(), 7000);
    }
    setInterval(createBalloon, 500);

    const ucapanDefault = [
        {nama:'Paman Jaya', isi:'Halo Ayana!. Semoga Ayana tumbuh menjadi anak yang pintar, sehat, dan selalu membahagiakan Mama dan Papa ayana. Jadilah anak yang ceria dan penuh semangat. Happy 1st birthday, Ayana!'}
    ];

    function getUcapanList() {
        const saved = localStorage.getItem('ucapanAyana');
        if(saved) return JSON.parse(saved);
        localStorage.setItem('ucapanAyana', JSON.stringify(ucapanDefault));
        return ucapanDefault;
    }
    function saveUcapanList(list) {
        localStorage.setItem('ucapanAyana', JSON.stringify(list));
    }

    function renderCards() {
        const cards = getUcapanList();
        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';
        cards.forEach(u => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <span class="cake-emoji">🎂</span>
                        💌 Dari ${u.nama}
                    </div>
                    <div class="card-back">
                        <p>${u.isi.replace(/\n/g,'<br>')}</p>
                        <span class="signature">${u.nama}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click',()=>card.classList.toggle('flipped'));
            container.appendChild(card);
        });
    }
    renderCards();

    document.getElementById('formUcapan').addEventListener('submit',function(e){
        e.preventDefault();
        const nama = document.getElementById('namaPengirim').value.trim() || 'Anonim';
        const isi = document.getElementById('isiUcapan').value.trim();
        if(!isi) return;
        const list = getUcapanList();
        list.unshift({nama, isi});
        saveUcapanList(list);
        renderCards();
        this.reset();
    });