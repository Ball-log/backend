-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ballog
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ballog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ballog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ballog` ;

-- -----------------------------------------------------
-- Table `ballog`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `manager_name` VARCHAR(45) NOT NULL,
  `home_stadium` VARCHAR(20) NOT NULL,
  `hometown` VARCHAR(30) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`user` (
  `id` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `team_id` INT NULL DEFAULT NULL,
  `isActive` TINYINT(1) NOT NULL DEFAULT '1',
  `inactive_at` DATETIME NULL DEFAULT NULL,
  `profile_img_url` TEXT NULL DEFAULT NULL,
  `profile_background_img_url` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `emil_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_team_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_team`
    FOREIGN KEY (`team_id`)
    REFERENCES `ballog`.`team` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `body` TEXT NOT NULL,
  `thumbnail_url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `team_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_team1_idx` (`team_id` ASC) VISIBLE,
  INDEX `fk_article_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_team1`
    FOREIGN KEY (`team_id`)
    REFERENCES `ballog`.`team` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`article_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`article_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `article_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_comment_article1_idx` (`article_id` ASC) VISIBLE,
  INDEX `fk_article_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_comment_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `ballog`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`article_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`article_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` TEXT NOT NULL,
  `article_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_article_image_article1_idx` (`article_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_image_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `ballog`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`article_reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`article_reply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` VARCHAR(100) NOT NULL,
  `article_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_reply_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_article_reply_article1_idx` (`article_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_reply_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `ballog`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_reply_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`blog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`blog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `body` TEXT NOT NULL,
  `public` TINYINT(1) NOT NULL,
  `thumbnail_url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_blog_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_blog_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`blog_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`blog_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blog_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_blog_comment_blog1_idx` (`blog_id` ASC) VISIBLE,
  INDEX `fk_blog_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_blog_comment_blog1`
    FOREIGN KEY (`blog_id`)
    REFERENCES `ballog`.`blog` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`blog_reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`blog_reply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(500) NOT NULL,
  `Field` DATETIME(6) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blog_comment_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_blog_reply_blog_comment1_idx` (`blog_comment_id` ASC) VISIBLE,
  INDEX `fk_blog_reply_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_blog_reply_blog_comment1`
    FOREIGN KEY (`blog_comment_id`)
    REFERENCES `ballog`.`blog_comment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_reply_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`match` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `home_team_id` INT NOT NULL,
  `away_team_id` INT NOT NULL,
  `match_date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `home_team_score` INT NOT NULL DEFAULT '0',
  `away_team_score` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_team_has_team_team2_idx` (`away_team_id` ASC) VISIBLE,
  INDEX `fk_team_has_team_team1_idx` (`home_team_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_has_team_team1`
    FOREIGN KEY (`home_team_id`)
    REFERENCES `ballog`.`team` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_team_has_team_team2`
    FOREIGN KEY (`away_team_id`)
    REFERENCES `ballog`.`team` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`player` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `number` INT NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `team_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_player_team1_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_player_team1`
    FOREIGN KEY (`team_id`)
    REFERENCES `ballog`.`team` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`match_has_player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`match_has_player` (
  `id` INT NOT NULL,
  `match_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `player_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_match_has_player_match1_idx` (`match_id` ASC) VISIBLE,
  INDEX `fk_match_has_player_player1_idx` (`player_id` ASC) VISIBLE,
  CONSTRAINT `fk_match_has_player_match1`
    FOREIGN KEY (`match_id`)
    REFERENCES `ballog`.`match` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_match_has_player_player1`
    FOREIGN KEY (`player_id`)
    REFERENCES `ballog`.`player` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`mvp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`mvp` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_name` VARCHAR(20) NOT NULL,
  `player_record` TEXT NOT NULL,
  `public` TINYINT(1) NOT NULL,
  `player_img_url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mvp_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_mvp_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`mvp_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`mvp_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mvp_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mvp_comment_mvp1_idx` (`mvp_id` ASC) VISIBLE,
  INDEX `fk_mvp_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_mvp_comment_mvp1`
    FOREIGN KEY (`mvp_id`)
    REFERENCES `ballog`.`mvp` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mvp_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`mvp_reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`mvp_reply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mvp_id` INT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mvp_reply_mvp1_idx` (`mvp_id` ASC) VISIBLE,
  INDEX `fk_mvp_reply_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_mvp_reply_mvp1`
    FOREIGN KEY (`mvp_id`)
    REFERENCES `ballog`.`mvp` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mvp_reply_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ballog`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ballog`.`sign_up_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ballog`.`sign_up_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `term` INT NOT NULL,
  `body` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;