using Microsoft.EntityFrameworkCore.Migrations;

namespace PRY2020237.Repository.Migrations
{
    public partial class AddColumnInUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "tokenLogin",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tokenLogin",
                table: "User");
        }
    }
}
