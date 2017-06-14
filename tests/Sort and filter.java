package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class SortAndFilter {
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
  public void testSortAndFilter() throws Exception {
    driver.get(baseUrl + "/");
    driver.findElement(By.linkText("Vegetarian")).click();
    driver.findElement(By.linkText("Barbeque")).click();
    driver.findElement(By.linkText("Dessert")).click();
    driver.findElement(By.linkText("Snack")).click();
    driver.findElement(By.id("dinner")).click();
    driver.findElement(By.linkText("Lunch")).click();
    driver.findElement(By.linkText("Breakfast")).click();
    driver.findElement(By.linkText("Sort by name")).click();
    driver.findElement(By.id("justClick")).click();
    driver.findElement(By.linkText("Sort by rating")).click();
    driver.findElement(By.linkText("Sort by name")).click();
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