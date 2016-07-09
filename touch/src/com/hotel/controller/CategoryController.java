package com.hotel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.entity.Category;
import com.hotel.service.CategoryService;

@Controller
@RequestMapping(value = "category", produces = "application/json;charset=utf-8")
public class CategoryController {
  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/get")
  public @ResponseBody ExtResponse getCategory() {
    ExtResponse rsp = new ExtResponse(); // 这是一条注释
    List<Category> categorie = categoryService.getAllCategories();
    rsp.setData(categorie);
    return rsp;
  }
}
