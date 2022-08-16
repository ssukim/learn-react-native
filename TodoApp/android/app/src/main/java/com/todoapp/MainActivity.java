package com.todoapp;

import androidx.core.app.ActivityCompat;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity implements ActivityCompat.OnRequestPermissionsResultCallback {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TodoApp";
  }
}
