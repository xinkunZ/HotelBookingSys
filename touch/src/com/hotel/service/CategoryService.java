package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.CategoryDao;
import com.hotel.entity.Category;

@Service
public class CategoryService {

  @Autowired
  private CategoryDao categoryDao;

  @Transactional
  public Category save(Category category) {
    return categoryDao.save(category);
  }

  @Transactional
  public Category getByCode(String code) {
    return categoryDao.getByCode(code);
  }

  @Transactional
  public List<Category> getAllCategories() {
    return categoryDao.getAllCategories();
  }

}
