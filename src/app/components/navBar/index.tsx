import { Button, Toolbar } from "@mui/material"

const NavBar = () =>{
    const handleItemClick = (ref: string) => {
        window.location.href = `/${ref}`;
      };
    
    return (  <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,  //  khoảng cách giữa các nút
          paddingY: 0.2,  // padding dọc 
          backgroundColor: 'white',
        }}
      >
        <Button
         onClick={()=> handleItemClick('')}
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Trang Chủ
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
          onClick={()=> handleItemClick('product-list')}
        >
          Túi Xách
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
          onClick={()=> handleItemClick('product-list')}
        >
          Sneaker
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
          onClick={()=> handleItemClick('product-list')}
        >
          Phụ Kiện
        </Button>
        <Button
          onClick={()=> handleItemClick('contact')}
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Liên Hệ
        </Button>
      </Toolbar>)
}


export default NavBar;