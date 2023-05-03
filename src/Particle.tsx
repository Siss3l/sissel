"use strict";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { IOptions, Container, Engine } from "tsparticles-engine";


export type RecursivePartial<T> = { [P in keyof T]? : T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P]; };

const options: RecursivePartial<IOptions> = {
  /**
   * This `object` contains the values used to set the behavior of visual particles in a JSON format.
   * 
   * @default RecursivePartial<IOptions>
   */
  "fpsLimit": 60,
  "background": {
    "color": "transparent",
  },
  "particles": {
    "collisions": {
      "enable": true
    },
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "area": 800
      }
    },
    "color": {
      "value": "#9ACC14"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.5,
        "minimumValue": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "minimumValue": 0.1,
        "sync": false
      }
    },
    "links": {
      "enable": true,
      "distance": 120,
      "color": ["#2E8C4F", "#4EC245", "#BDC829", "#00EFE0", "#EF624D", "#FF7F50"],
      "opacity": 0.5,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "bottom",
      "random": false,
      "straight": false,
      "outMode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detectsOn": undefined,
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": false
    },
    "modes": {
      "grab": {
        "distance": 100,
        "links": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 10,
        "size": 40,
        "duration": 2,
        "opacity": 8
      },
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "quantity": 4
      },
      "remove": {
        "quantity": 2
      }
    }
  },
  "retinaDetect": true
};

export default function Particle() {
  const particlesInit = (main: Engine) : Promise<void> => {
      return loadFull(main);
  };

  const particlesLoaded = (_container?: Container) : Promise<void> => {
    return Promise?.resolve();
  };

  return (<Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options}/>);
}