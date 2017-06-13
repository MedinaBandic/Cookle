require('geckodriver');
var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.firefox()).
build();

test.describe('Cookle Testovi', function() {

  test.before(function() {
      console.log("Before tests callback");
  });

  test.it('unsuccessful login', function() {
    driver.get("https://cookle.club/login.html");
    driver.findElement(webdriver.By.name("username")).clear();
    driver.findElement(webdriver.By.name("username")).sendKeys("iman");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("bla");
    driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click();


  });

  test.it('successful login', function() {
    driver.get("https://cookle.club/login.html");
    driver.findElement(webdriver.By.name("username")).clear();
    driver.findElement(webdriver.By.name("username")).sendKeys("fata");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("0000");
    driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click();

    driver.wait(webdriver.until.elementLocated(webdriver.By.id("username")), 3004);

/*
    driver.findElement(webdriver.By.id("user-name")).getText().then(function(elem){
      assert.equal(elem, "{{USER.NAME}}");
    }); */
  });

  test.after(function() {
      driver.quit();
  });

});
