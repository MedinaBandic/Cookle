package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class AddRecipe {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @BeforeClass(alwaysRun = true)
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://cookle.club/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testAddRecipe() throws Exception {
    driver.get(baseUrl + "/");
    driver.findElement(By.linkText("Add new recipe")).click();
    driver.findElement(By.name("title")).clear();
    driver.findElement(By.name("title")).sendKeys("Bosanski burek");
    driver.findElement(By.name("ingredients")).clear();
    driver.findElement(By.name("ingredients")).sendKeys("500 gr mekog brasna     260 ml mlake vode     15 gr soli     1 zlica ulja ( neko stavi a neko ne )     .....Fil....     1-2 zlice ulja     1 glavica crvena luka sitno naseckana     500 gr mlevene govedine ( junetine )     1.5 zlicica soli     1/2 zlicice mlevenog bibera     Plus 120 ml ulja");
    driver.findElement(By.cssSelector("input[name=\"description\"]")).clear();
    driver.findElement(By.cssSelector("input[name=\"description\"]")).sendKeys("Originalni recept");
    new Select(driver.findElement(By.xpath("//section[@id='contact']/div/div/div/div[3]/div[4]/select"))).selectByVisibleText("dinner");
    new Select(driver.findElement(By.xpath("//section[@id='contact']/div/div/div/div[3]/div[4]/select"))).selectByVisibleText("lunch");
    driver.findElement(By.name("image")).clear();
    driver.findElement(By.name("image")).sendKeys("https://coolinarika-cdn.azureedge.net/image/burek-iz-bosne-fe32005090e539463e074283e3cba527_header.jpg?v=10");
    driver.findElement(By.xpath("//body[@id='body']/div[6]/div/div/div[3]/div")).click();
    driver.findElement(By.name("video")).clear();
    driver.findElement(By.name("video")).sendKeys("https://www.youtube.com/embed/4gEyVbwlKF4");
    driver.findElement(By.cssSelector("button.contacts-btn")).click();
  }

  @AfterClass(alwaysRun = true)
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
