package top.jayu.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.jayu.exam.entry.Test;
import top.jayu.exam.mapper.TestMapper;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    TestMapper testMapper;

    @GetMapping("/query")
    List<Test> query(){
        return testMapper.queryTest();
    }

}
