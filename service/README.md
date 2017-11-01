# Service for Education Social Network

## NOTE

    Các gói tin trả về có dạng: {code:<logic_code>, message: <detail_infomation>, data: <object_data>, [error: <error_object>]}.

    Logic code ở trên độc lập với HTTP_RESPONSE_CODE mặc định của giao thức HTTP, do vậy các lỗi liên quan đến kết nối (VD: timeout...) sẽ không được mô tả. Thông thường <logic_code> sẽ trùng với HTTP_RESPONSE_CODE.

    Một số <logic_code> mặc định (dựa trên chuẩn HTTP) :
        + 1xx: Information.
        + 2xx: Success.
        + 3xx: Redirection.
        + 4xx: Client Error.
        + 5xx: Server Error.

    Các API sử dụng `id_user`, sau sẽ được hỗ trợ thêm thông qua lưu trữ session phía service.

    Việc phân quyền về sau cũng sẽ sử dụng `id_user` đã đăng nhập để kiểm tra (VD: Thao tác đối với người file, user, class, post...). Các API không đủ quyền xem xét service sẽ tự chuyển hướng đến giao diện tương ứng (đăng nhập/chấp nhận quyền);

    Các trường thông tin theo key:value đều hỗ trợ 2 định dạng _FORM_ & _JSON_ ngoại trừ các trường thông tin đặc biệt như file(dùng form-multilpart, có thể xem xét truyền dữ liệu dưới định dạng BinaryToText như `Base64` cho các file nhỏ trực tiếp trên định dạng JSON).

## REFERENCE

[API_DETAIL_UPDATE_LINK](https://app.swaggerhub.com/apis/huynv/profile_new/1.0.0)

---

## CHANGE LOG

---

## UPDATE LOG

### `23/10/2017`

#### Xong các API FileManager: `/files/*`

Thông tin **FileItem** bao gồm:

        id: :file_id
        name: ten_file_gui_len
        type: mime_type
        size: kich_thuoc_file_tinh_theo_byte
        createDate: thoi_gian_upload_theo_timezone_service

##### Upload 1 file (`/temp/test.html`)

    + Method: POST
    + URL: "http://domain:port/files/upload"
    + InputName: fileUpload"
    + Chưa có các chức năng lọc: size, type.
    + Chưa lưu người dùng upload: sẽ bổ sung sau.
    + Success: `data` chứa thông tin file vừa tài.
        {code: 200, message: '...', data: <file_info>}
    + Failed:
        {code: 500, message:..., data: null, error:error_message}

##### Upload 1 ảnh: Tương tự như upload file (`/temp/test.html`)

    + Method: POST
    + URL: http://domain:port/files/image"
    + InputName: imageUpload
    + Lọc chỉ file có đuôi "jpg/jpeg/png/gif", chưa lọc size.
    + Success: `data` là thông tin file đã upload.
        - {code: 200, message: "...", data: <file_info>}
    + Failed:
        - {code: 500, ...} : Client Error: Không upload được.
        - {code: 400, ...} : Server Error: File upload không thỏa mãn.

##### Xóa 1 file bằng `file_id` `(/temp/test.html)`

    + Method: DELETE
    + URL: http://domain:port/files/delete/:file_id : file_id cần xóa.
    + Success: `data` là thông tin file đã xóa.
        - {code: 200, message: "...", data: <file_info>}
    + Failed:
        - {code: 400, ...} : Client Error: Không tồn tại file.
        - {code: 500, ...} : Server Error: Không thể xóa.

##### Lấy thông tin file bằng `file_id`

    + Method: GET
    + URL: http://domain:port/files/info/:file_id : file_id cần lấy thông tin.
    + Success: `data` là thông tin file cần lấy.
        - {code: 200, message: "...", data: <file_id>}
    + Failed:
        - {code: 400, ...} : Client Error: Không tồn tại file.
        - {code: 500, ...} : Server Error: Không thể lấy thông tin.

##### Tải file, ảnh bằng `file_id`

    + Method: GET
    + URL: http://domain:port/files/get/:file_id (nên dùng khi load ảnh trên trình duyệt) hoặc http://domain:port/files/attach/:file_id (nên dùng khi tải file/ảnh): file_id cần tải.
    + Success: trả về file download (ghi trực tiếp xuống http_body, thông tin file trong http_header).
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Không tồn tại file.
        - {code: 500, ...} : Server Error: Không thể lấy thông tin.

##### `[TEST_API]` Lấy về tất cả file tải lên: `(sau sẽ thay bằng người dùng)`

    + Method: GET
    + URL: http://domain:port/test/files
    + Success: `data` là mảng thông tin file.
        - {code: 200, message: "...", data: [...files]}
    + Failed:
        - {code: 500, ...} : Server Error: Không thể lấy thông tin.

---

### `31/10/2017`

#### Xong các API cơ bản của User: `/users/*`

Thông tin **User** bao gồm:

        id: id_user unique
        username: user_name
        typeuser: type_user
        password: pass_word
        firstName: firstName
        lastName: lastname
        email: email|null:unique
        phone: phone|null:unique
        profileImageID: profile_image_file_id
        coverImageID: cover_image_file_ID
        birthday: birthday
        gender: [NONE, FEMALE, MALE]
        about: about
        quote : quote
        nickname: array_string_nickname
        skills: array_skill
        worked: array_work
        language: array_language
        lifeEvent: array_life_Event
        classs: array_id_classs
        friends: array_id_friends
        status: [NEW, BLOCKED, NORMAL]
        location: location

**NOTE** : Thông tin cơ bản trả cho thông tin người dùng mặcđịnh không bao gồm: `password`, `skills`, `friends`, `classs`, `status`, `lifeEvent` (_Sẽ có API riêng_).

##### Tạo người dùng với `username`

    + Method: POST
    + URL: http://domain:port/users/
    + Success: `data` là thông tin User được update.
        - {code: 200, message: "...", data: <user_info>}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Update thông tin người dùng qua `username`, không thể thay đổi `id_user`, `username`

    + Method: PUT
    + URL: http://domain:port/users/
    + Success: `data` là thông tin User được update.
        - {code: 200, message: "...", data: <user_info>}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Thay đổi thông tin người dùng qua `id_user`

    + Method: PUT
    + URL: http://domain:port/users/:id_user
    + Success: `data` là thông tin User được update.
        - {code: 200, message: "...", data: <user_info>}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Lấy thông tin cơ bản người dùng qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/:id_user
    + Success: `data` là thông tin User cần lấy.
        - {code: 200, message: "...", data: <user_info>}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Xóa người dùng qua `id_user`

    + Method: DELETE
    + URL: http://domain:port/users/:id_user
    + Success: `data` là thông tin User xóa.
        - {code: 200, message: "...", data: <user_info>}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Danh sách bạn qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/friends/:id_user
    + Success: `data` mảng id người dùng là bạn.
        - {code: 200, message: "...", data: [...friendIDs]}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Danh sách nhóm qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/classs/:id_user
    + Success: `data` mảng id nhóm.
        - {code: 200, message: "...", data: [...classs]}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Danh sách file người dùng qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/files/:id_user
    + Success: `data` mảng id file.
        - {code: 200, message: "...", data: [...files]}
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Lấy ảnh Profile|Cover qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/profileImage/:id_user
    + Success:
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Thay đổi ảnh Profile|Cover qua `id_user`

    + Method: PUT, POST
    + URL: http://domain:port/users/profileImage
    + InputName: profileImage.
    + Success: Thông tin tin file profile đã upload.
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Lấy ảnh avatar qua `id_user`

    + Method: GET
    + URL: http://domain:port/users/avatarImage/:id_user
    + Success: Trả về file download (ghi trực tiếp xuống http_body, thông tin file trong http_header).
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### Thay đổi ảnh avatar qua `id_user`

    + Method: PUT, POST
    + URL: http://domain:port/users/avatarImage/:id_user
    + InputName: avatarImage.
    + Success: Thông tin file avatar đã upload.
    + Failed: HTTP_RESPONSE_CODE khác 200 trùng với <logic_code>
        - {code: 400, message:....} : Client Error: Thông tin lỗi (thiếu, sai định dạng).
        - {code: 500, ...} : Server Error: Không thể thực hiện.

##### `[TEST_API]` Lấy về tất cả User

    + Method: GET
    + URL: http://domain:port/test/users
    + Success: `data` là mảng thông tin user.
        - {code: 200, message: "...", data: [...users]}
    + Failed:
        - {code: 500, ...} : Server Error: Không thể lấy thông tin.

---