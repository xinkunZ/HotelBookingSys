package com.hotel.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 
 * @author L <br>
 *         uuid 唯一id <br>
 *         name 房间类型名称 <br>
 *         code 房间类型代码 <br>
 *         description 设施描述<br>
 *         roomprice 整间价格<br>
 * 
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String uuid;
  private String name;
  private String code;
  private String description;
  private double roomprice;

  @Id
  @Column(length = 38, nullable = false)
  @GeneratedValue(generator = "category-uuid")
  @GenericGenerator(name = "category-uuid", strategy = "uuid")
  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public double getRoomprice() {
    return roomprice;
  }

  public void setRoomprice(double roomprice) {
    this.roomprice = roomprice;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
