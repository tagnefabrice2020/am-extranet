import React from "react";

const NotAllowed = () => {
    return (
        <>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>403 Not authorize</h1>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
      </div>
      </>
    )
}

export default NotAllowed;