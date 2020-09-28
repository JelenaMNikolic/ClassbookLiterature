package com.dipl.classbooklit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.dipl.classbooklit.entity"})
public class ClassbooklitApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassbooklitApplication.class, args);
	}

}
