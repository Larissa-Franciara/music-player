const music = new Audio('Birds.mp3')

const songs = [
    {
        id:'1',
        songName: ` On My Way <br>
        <div class="subtitle"> Alan Walker </div>`,
        poster: 'img/1.jpg'
    },
    {
        id:'2',
        songName: ` Faded <br>
        <div class="subtitle"> Alan Walker </div>`,
        poster: 'img/2.jpg'
    },
    {
        id:'3',
        songName: ` Born This Way <br>
        <div class="subtitle"> Lady Gaga </div>`,
        poster: 'img/3.jpg'
    },
    {
        id:'4',
        songName: ` Lost on You <br>
        <div class="subtitle"> Lp </div>`,
        poster: 'img/4.jpg'
    },
    {
        id:'5',
        songName: ` Head & Heart (feat. MNEK)  <br>
        <div class="subtitle"> Joel Corry </div>`,
        poster: 'img/5.jpg'
    },
    {
        id:'6',
        songName: ` X (with Karol G) <br>
        <div class="subtitle"> Jonas Brothers, Karol G </div>`,
        poster: 'img/6.jpg'
    },
    {
        id:'7',
        songName: ` Sofia <br>
        <div class="subtitle">  Clairo </div>`,
        poster: 'img/7.jpg'
    },
    {
        id:'8',
        songName: ` Another Brick in the wall, Pt.2 <br>
        <div class="subtitle"> Pink Floyd </div>`,
        poster: 'img/8.jpg'
    },
    {
        id:'9',
        songName: ` Demons <br>
        <div class="subtitle"> Imagine Dragons </div>`,
        poster: 'img/9.jpg'
    },
    {
        id:'10',
        songName: ` Judas <br>
        <div class="subtitle"> Lady Gaga </div>`,
        poster: 'img/10.jpg'
    },
    {
        id:'11',
        songName: ` It Must Have Been Love <br>
        <div class="subtitle"> Roxette </div>`,
        poster: 'img/11.jpg'
    },
    {
        id:'12',
        songName: ` Nothing Else Matters <br>
        <div class="subtitle"> Metallica </div>`,
        poster: 'img/12.jpg'
    },
    {
        id:'13',
        songName: ` Just Give Me a Reason <br>
        <div class="subtitle"> Pink </div>`,
        poster: 'img/13.jpg'
    },
    {
        id:'14',
        songName: ` Still Loving You<br>
        <div class="subtitle"> Scorpions </div>`,
        poster: 'img/14.jpg '
    },
 
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () =>{
    if(music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        

    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})

 
const makeAllPLays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    
    })

}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })

}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPLays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `music/${index}.mp3`
        download_music.href = `music/${index}.mp3`
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
      /*   music.addEventListener('ended', () => {
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
        }) */
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

    })
}) 

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () =>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec < 10) {
        sec = `0${sec}`
    }

    currentEnd.innerHTML = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec < 10) {
        sec1 = `0 ${sec1}`
    }

    currentStart.innerHTML = `${min1}:${sec1}`;

    let progressBar = parseInt((music.currentTime/music.duration)*100)
    seek.value = progressBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`
    dot.style.left = `${seekBar}%`
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100;
})

const next_music = () => {
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    if (index == songs.length) {
        index == 0;
    }
    index ++;
    music.src = `music/${index}.mp3`;
    download_music.href = `music/${index}.mp3`
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName)
    })
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    makeAllPLays();
    document.getElementsByClassName('playListPlay')[index-1].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index-1].classList.add('bi-pause-circle-fill');
}

const repeat_music = () => {
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    index;
    music.src = `music/${index}.mp3`;
    download_music.href = `music/${index}.mp3`
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName)
    })
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    makeAllPLays();
    document.getElementsByClassName('playListPlay')[index-1].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index-1].classList.add('bi-pause-circle-fill');
}

const random_music = () => {
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    if (index == songs.length) {
        index == 0;
    }
    index = Math.floor((Math.random()* songs.length)+1);
    music.src = `music/${index}.mp3`;
    download_music.href = `music/${index}.mp3`
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName)
    })
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    makeAllPLays();
    document.getElementsByClassName('playListPlay')[index-1].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index-1].classList.add('bi-pause-circle-fill');
}

let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click' , () => {
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
        case "repeat":
                shuffle.classList.remove('bi-arrow-repeat');
                shuffle.classList.remove('bi-music-note-beamed');
                shuffle.classList.add('bi-shuffle');
                shuffle.innerHTML = 'random';
            break;
        case "random":
                shuffle.classList.remove('bi-arrow-repeat');
                shuffle.classList.add('bi-music-note-beamed');
                shuffle.classList.remove('bi-shuffle');
                shuffle.innerHTML = 'next';
            break;
    }
})

music.addEventListener('ended', () => {
    let b = shuffle.innerHTML;

    switch (b) {
        case "repeat":
            repeat_music();
            break;

        case "next":
            next_music();
            break;

        case "random":
            random_music();
            break;
    }
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if(vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`
    vol_dot.style.left = `${vol_a}%`
    music.volume = vol_a/100

})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `music/${index}.mp3`
    download_music.href = `music/${index}.mp3`
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName)
    })
    makeAllPLays();

   document.getElementById(`${index}`).classList.remove('bi-play-fill');
   document.getElementById(`${index}`).classList.add('bi-pause-fill');

   makeAllBackgrounds();
   Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})


next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;

    } 
    music.src = `music/${index}.mp3`
    download_music.href = `music/${index}.mp3`
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName)
    })
    makeAllPLays();

   document.getElementById(`${index}`).classList.remove('bi-play-fill');
   document.getElementById(`${index}`).classList.add('bi-pause-fill');

   makeAllBackgrounds();
   Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click' , () => {
    pop_song.scrollLeft -= 330;
})

right_scroll.addEventListener('click' , () => {
    pop_song.scrollLeft += 330;
})

let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click' , () => {
    item.scrollLeft -= 330;
})

right_scrolls.addEventListener('click' , () => {
    item.scrollLeft += 330;
})


