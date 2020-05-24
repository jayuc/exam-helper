package top.jayu.exam;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppTests {

	@Test
	public void contextLoads() {
		System.out.println("我第一次测试执行");
		
	}
	
	@Before
	public void before() {
		System.out.println("执行之前执行");
	}
	
	@After
	public void after() {
		System.out.println("执行之后执行");
	}

}
