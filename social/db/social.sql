DROP TABLE IF EXISTS comments
DROP TABLE IF EXISTS articles

CREATE TABLE IF NOT EXISTS `social`.`comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `deleted` TINYINT(1) NULL,
  `articles_id` INT(11) NOT NULL,
  `comments_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_articles_idx` (`articles_id` ASC),
  INDEX `fk_comments_comments1_idx` (`comments_id` ASC),
  CONSTRAINT `fk_comments_articles`
    FOREIGN KEY (`articles_id`)
    REFERENCES `social`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_comments1`
    FOREIGN KEY (`comments_id`)
    REFERENCES `social`.`comments` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `social`.`articles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8
