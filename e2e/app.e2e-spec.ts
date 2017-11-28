import { PickupBasketballPage } from './app.po';

describe('pickup-basketball App', () => {
  let page: PickupBasketballPage;

  beforeEach(() => {
    page = new PickupBasketballPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
