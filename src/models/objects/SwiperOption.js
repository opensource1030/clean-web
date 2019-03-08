export default class SwiperOption {

  constructor(onReachEnd, onReachBeginning) {
    this.prevButton = '.swiper-button-prev',
    this.nextButton = '.swiper-button-next',
    this.slidesPerView = 5,
    this.spaceBetween = 10,

    this.slidesPerView = {
      1350: 4,
      1270: 4,
      1200: 4,
      1100: 4,
      1050: 3,
      1000: 3,
      900: 2,
      870: 2,
      860: 3,
      850: 2,
      750: 2,
      560: 2,
      550: 1,
      500: 1,
      450: 1,
      380: 1,
    };

    this.onReachEnd = onReachEnd;
    this.onReachBeginning = onReachBeginning;
  }

  toJSON(b1, b2, b3, b4) {
    return {
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      slidesPerView: 5,
      spaceBetween: 10,
      breakpoints: {
        [b1]: {
          slidesPerView: this.slidesPerView[b1],
        },
        [b2]: {
          slidesPerView: this.slidesPerView[b2],
        },
        [b3]: {
          slidesPerView: this.slidesPerView[b3],
        },
        [b4]: {
          slidesPerView: this.slidesPerView[b4],
        }
      },
      onReachEnd: this.onReachEnd,
      onReachBeginning: this.onReachBeginning,
    };
  }
}
