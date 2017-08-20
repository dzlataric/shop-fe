import { ShopFePage } from './app.po';

describe('shop-fe App', () => {
  let page: ShopFePage;

  beforeEach(() => {
    page = new ShopFePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
