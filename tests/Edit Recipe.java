package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class EditRecipe {
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
  public void testEditRecipe() throws Exception {
    driver.get(baseUrl + "/");
    driver.findElement(By.xpath("//span[@onclick='openNav()']")).click();
    driver.findElement(By.linkText("Login")).click();
    driver.findElement(By.id("username")).clear();
    driver.findElement(By.id("username")).sendKeys("Fatima");
    driver.findElement(By.id("password")).clear();
    driver.findElement(By.id("password")).sendKeys("fatima");
    driver.findElement(By.cssSelector("button.contacts-btn")).click();
    driver.findElement(By.xpath("(//a[contains(text(),'Edit')])[10]")).click();
    driver.findElement(By.xpath("(//input[@name='title'])[2]")).clear();
    driver.findElement(By.xpath("(//input[@name='title'])[2]")).sendKeys("Burek");
    driver.findElement(By.xpath("(//input[@name='description'])[2]")).clear();
    driver.findElement(By.xpath("(//input[@name='description'])[2]")).sendKeys("Originalni bosanski recept");
    driver.findElement(By.cssSelector("#updateRecipe > div.container > div.row.msg-row > div.col-md-12.col-sm-12 > div.col-md-12.btnpad > div.contacts-btn-pad > button.contacts-btn")).click();
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
