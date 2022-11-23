
randomize_button = document.getElementById("randomize");
size_slider = document.getElementById("size_slider");
algorithm_selecter = document.getElementById("algorithm_to_use");
speed_selecter = document.getElementById("speed_selecter");
sorting_start_button = document.getElementById("start_sorting");
bar_container = document.getElementById("bar_container");
bar = document.getElementById("bar");

let number_of_bars = size_slider.value;
let random_array = new Array(number_of_bars);

let minimium_in_array = 1;
let maximum_in_array = number_of_bars;
let height_factor = 4;
let algoritm_to_use = "";
let speed_factor = 0;

function random_number(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function create_random_array(){
    let array = new Array(number_of_bars);
    for (let i = 0; i < number_of_bars; i++){
        array[i] = random_number(minimium_in_array, maximum_in_array);
    }

    return array;
}

document.addEventListener("DOMContentLoaded", function() {
    random_array = create_random_array();
    render_bars(random_array);
    size_slider.max = Math.floor(screen.width / 20);
});

speed_selecter.addEventListener("change", function(){
  if (speed_selecter.value == "slow") speed_factor = 1000;
  else if (speed_selecter.value == "medium") speed_factor = 500;
  else if (speed_selecter.value == "fast") speed_factor = 100;

  console.log("speed" + speed_factor);
})

function render_bars(array){
    for (let i = 0; i < number_of_bars; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * height_factor + "px";
        bar_container.appendChild(bar);
    }
}

randomize.addEventListener("click", function() {
    random_array = create_random_array();
    bar_container.innerHTML = "";
    render_bars(random_array);
});

size_slider.addEventListener("input", function() {
    number_of_bars = size_slider.value;
    maximum_in_array = size_slider.value;
    bar_container.innerHTML = "";
    random_array = create_random_array();
    render_bars(random_array);
})

function sleep_for(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

algorithm_selecter.addEventListener("change", function() {
    algoritm_to_use = algorithm_selecter.value;
})

sorting_start_button.addEventListener("click", function () {
    switch (algoritm_to_use) {
        case "bubble_sort":
          bubble_sort(random_array);
          break;
        
        case "insertion_sort":
        insertion_sort(random_array);
        break;

        case "selection_sort":
          selection_sort(random_array);
          break;

        case "heap_sort":
          heap_sort(random_array);
          break;

        case "quick_sort":
          console.log(random_array.length);

          quick_sort(random_array, 0, random_array.length - 1);
          break;
        default:
          bubble_sort(random_array);
          break;
      }
});
  

//-----------------------------BUBBLE SORT-----------------------------
async function bubble_sort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {

        bars[j].style.backgroundColor = "pink";
        bars[j + 1].style.backgroundColor = "pink";

        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length - i - 1; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "floralwhite";
            }
          }
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          bars[j].style.height = array[j] * height_factor + "px";
          bars[j].style.backgroundColor = "red";
          bars[j + 1].style.height = array[j + 1] * height_factor + "px";
          bars[j + 1].style.backgroundColor = "red";
          await sleep_for(speed_factor);
        }
      }
      
      bars[array.length - i - 1].style.backgroundColor = "green";
      bars[array.length - i - 2].style.backgroundColor = "floralwhite";
      await sleep_for(speed_factor);
    }
    return array;
}

//-----------------------------INSERTION SORT-----------------------------
async function insertion_sort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    
    for (let c = 0; c < i; c++){
      bars[c].style.backgroundColor = "green";
    }

    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      let temp = array[j];
      array[j] = key;
      array[j + 1] = temp;
      // array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * height_factor + "px";
      bars[j].style.height = array[j] * height_factor + "px";
      bars[j + 1].style.backgroundColor = "green";
      bars[j].style.backgroundColor = "red";

      await sleep_for(speed_factor);
      j = j - 1;
    }

    bars[j + 1].style.backgroundColor = "grey"
    await sleep_for(100);
    bars[j + 1].style.backgroundColor = "green"
    // array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * height_factor + "px";
    // bars[j + 1].style.backgroundColor = "lightgreen";

    await sleep_for(speed_factor);
  }

  for (let c = 0; c < array.length; c++){
    bars[c].style.backgroundColor = "green";
  }
  return array;
}

//-----------------------------SELECTION SORT-----------------------------
async function selection_sort(array){
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++){
    for (let c = 0; c < i; c++){
      bars[c].style.backgroundColor = "green";
    }
    bars[i].style.backgroundColor = "red";
    for (let c = i + 1; c < array.length; c++){
      bars[c].style.backgroundColor = "floralwhite";
    }
    let jmin = i;
    for (let j = i + 1; j < array.length; j++){
      bars[j].style.backgroundColor = "pink";
      await sleep_for(speed_factor);
      if (array[j] < array[jmin]){
        jmin = j;
        for (let c = i + 1; c < j; c++){
          bars[c].style.backgroundColor = "floralwhite";
        }
        bars[j].style.backgroundColor = "blue";
      }

      
      
      if (j != jmin){
        bars[j].style.backgroundColor = "floralwhite";
      }
    }

    if (jmin != i){
      let temp = array[i];
      array[i] = array[jmin];
      array[jmin] = temp;

      await sleep_for(speed_factor);

      bars[i].style.backgroundColor = "black";
      bars[jmin].style.backgroundColor = "black";
      bars[i].style.height = array[i] * height_factor + "px";
      bars[jmin].style.height = array[jmin] * height_factor + "px";

      await sleep_for(300);

      bars[i].style.backgroundColor = "floralwhite";
      bars[jmin].style.backgroundColor = "floralwhite";

    }

    bars[i].style.backgroundColor = "green";
    await sleep_for(speed_factor);
  }
}

//-----------------------------HEAP SORT-----------------------------

async function heap_sort(array) {
  console.log(array);
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);

  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep_for(speed_factor);
  }
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * height_factor + "px";
  bars[j].style.height = array[j] * height_factor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep_for(speed_factor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  //bars[i].innerText = array[i];
  //bars[j].innerText = array[j];
  return array;
}
