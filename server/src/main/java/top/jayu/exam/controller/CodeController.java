package top.jayu.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.jayu.exam.entry.CodeType;
import top.jayu.exam.mapper.CodeTypeMapper;

import java.util.List;

/**
 * Created by 余杰 on 2020/5/26 9:49
 */

@RestController
@RequestMapping("/code")
public class CodeController {

    @Autowired
    CodeTypeMapper codeTypeMapper;

    @GetMapping("/queryAllCodeType")
    public List<CodeType> queryAllCodeType(){
        return codeTypeMapper.queryAll();
    }

}
